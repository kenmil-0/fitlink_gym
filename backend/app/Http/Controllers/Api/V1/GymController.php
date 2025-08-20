<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Gym;
use App\Models\Instructor;
use App\Models\Subscription;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class GymController extends Controller
{
    /**
     * Display a listing of gyms (public).
     */
    public function index(Request $request)
    {
        $query = Gym::with(['owner:id,name,email'])
                    ->approved()
                    ->verified();

        // Filter by city
        if ($request->has('city')) {
            $query->inCity($request->city);
        }

        // Filter by amenities
        if ($request->has('amenities')) {
            $amenities = explode(',', $request->amenities);
            foreach ($amenities as $amenity) {
                $query->whereJsonContains('amenities', $amenity);
            }
        }

        // Search by name or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort by rating, distance, or name
        $sortBy = $request->get('sort_by', 'rating');
        $sortOrder = $request->get('sort_order', 'desc');
        
        switch ($sortBy) {
            case 'rating':
                $query->orderBy('rating', $sortOrder);
                break;
            case 'name':
                $query->orderBy('name', $sortOrder);
                break;
            case 'distance':
                if ($request->has('latitude') && $request->has('longitude')) {
                    $lat = $request->latitude;
                    $lng = $request->longitude;
                    $query->orderByRaw("
                        ST_Distance_Sphere(
                            POINT(longitude, latitude), 
                            POINT(?, ?)
                        )
                    ", [$lng, $lat]);
                }
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $gyms = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'gyms' => $gyms->items(),
            'pagination' => [
                'current_page' => $gyms->currentPage(),
                'last_page' => $gyms->lastPage(),
                'per_page' => $gyms->perPage(),
                'total' => $gyms->total(),
            ]
        ]);
    }

    /**
     * Display the specified gym (public).
     */
    public function show(Gym $gym)
    {
        if ($gym->status !== 'approved' || !$gym->is_verified) {
            return response()->json(['message' => 'Gym not found'], 404);
        }

        $gym->load(['owner:id,name,email', 'instructors:id,name,specialization,rating']);

        return response()->json([
            'gym' => $gym
        ]);
    }

    /**
     * Get instructors for a specific gym (public).
     */
    public function instructors(Gym $gym)
    {
        if ($gym->status !== 'approved' || !$gym->is_verified) {
            return response()->json(['message' => 'Gym not found'], 404);
        }

        $instructors = $gym->instructors()
                           ->active()
                           ->available()
                           ->orderBy('rating', 'desc')
                           ->get();

        return response()->json([
            'gym' => $gym->only(['id', 'name']),
            'instructors' => $instructors
        ]);
    }

    /**
     * Store a newly created gym (gym owner only).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string|max:255',
            'amenities' => 'nullable|array',
            'amenities.*' => 'string|max:100',
            'operating_hours' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        // Check if user already has a gym
        if ($user->ownedGyms()->exists()) {
            return response()->json([
                'message' => 'You already have a gym registered'
            ], 400);
        }

        $gym = Gym::create([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'phone' => $request->phone,
            'email' => $request->email,
            'website' => $request->website,
            'logo' => $request->logo,
            'images' => $request->images,
            'amenities' => $request->amenities,
            'operating_hours' => $request->operating_hours,
            'owner_id' => $user->id,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Gym created successfully and pending approval',
            'gym' => $gym
        ], 201);
    }

    /**
     * Update the specified gym (gym owner only).
     */
    public function update(Request $request, Gym $gym)
    {
        $user = $request->user();

        // Check if user owns this gym
        if ($gym->owner_id !== $user->id) {
            return response()->json([
                'message' => 'Access denied. You can only update your own gym.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:1000',
            'address' => 'sometimes|string|max:500',
            'city' => 'sometimes|string|max:100',
            'state' => 'sometimes|string|max:100',
            'country' => 'sometimes|string|max:100',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'phone' => 'sometimes|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string|max:255',
            'amenities' => 'nullable|array',
            'amenities.*' => 'string|max:100',
            'operating_hours' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $gym->update($request->only([
            'name', 'description', 'address', 'city', 'state', 'country',
            'latitude', 'longitude', 'phone', 'email', 'website',
            'logo', 'images', 'amenities', 'operating_hours'
        ]));

        // Reset status to pending if significant changes were made
        if ($request->has(['name', 'address', 'phone'])) {
            $gym->update(['status' => 'pending']);
        }

        return response()->json([
            'message' => 'Gym updated successfully',
            'gym' => $gym
        ]);
    }

    /**
     * Remove the specified gym (gym owner only).
     */
    public function destroy(Request $request, Gym $gym)
    {
        $user = $request->user();

        // Check if user owns this gym
        if ($gym->owner_id !== $user->id) {
            return response()->json([
                'message' => 'Access denied. You can only delete your own gym.'
            ], 403);
        }

        // Check if gym has active subscriptions
        if ($gym->subscriptions()->active()->exists()) {
            return response()->json([
                'message' => 'Cannot delete gym with active subscriptions'
            ], 400);
        }

        $gym->delete();

        return response()->json([
            'message' => 'Gym deleted successfully'
        ]);
    }

    /**
     * Get gyms owned by the authenticated user (gym owner only).
     */
    public function myGyms(Request $request)
    {
        $user = $request->user();
        
        $gyms = $user->ownedGyms()
                     ->with(['instructors:id,name,specialization,rating'])
                     ->orderBy('created_at', 'desc')
                     ->get();

        return response()->json([
            'gyms' => $gyms
        ]);
    }

    /**
     * Get analytics for a specific gym (gym owner only).
     */
    public function analytics(Request $request, Gym $gym)
    {
        $user = $request->user();

        // Check if user owns this gym
        if ($gym->owner_id !== $user->id) {
            return response()->json([
                'message' => 'Access denied. You can only view analytics for your own gym.'
            ], 403);
        }

        // Get subscription statistics
        $subscriptionStats = [
            'total' => $gym->subscriptions()->count(),
            'active' => $gym->subscriptions()->active()->count(),
            'expired' => $gym->subscriptions()->expired()->count(),
            'expiring_soon' => $gym->subscriptions()->expiringSoon()->count(),
        ];

        // Get booking statistics
        $bookingStats = [
            'total' => $gym->bookings()->count(),
            'pending' => $gym->bookings()->pending()->count(),
            'confirmed' => $gym->bookings()->confirmed()->count(),
            'completed' => $gym->bookings()->completed()->count(),
            'cancelled' => $gym->bookings()->where('status', 'cancelled')->count(),
        ];

        // Get revenue statistics (last 30 days)
        $thirtyDaysAgo = now()->subDays(30);
        $revenueStats = [
            'last_30_days' => $gym->subscriptions()
                                  ->where('created_at', '>=', $thirtyDaysAgo)
                                  ->sum('amount'),
            'total_revenue' => $gym->subscriptions()->sum('amount'),
        ];

        // Get instructor statistics
        $instructorStats = [
            'total' => $gym->instructors()->count(),
            'active' => $gym->instructors()->active()->count(),
            'available' => $gym->instructors()->available()->count(),
        ];

        return response()->json([
            'gym' => $gym->only(['id', 'name', 'status', 'rating']),
            'analytics' => [
                'subscriptions' => $subscriptionStats,
                'bookings' => $bookingStats,
                'revenue' => $revenueStats,
                'instructors' => $instructorStats,
            ]
        ]);
    }
}
