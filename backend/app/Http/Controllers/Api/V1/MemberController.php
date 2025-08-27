<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function getSubscription(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            'status' => 'active',
            'plan' => 'Premium',
            'expires_at' => '2024-12-31'
        ]);
    }

    public function getWorkouts(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            [
                'id' => 1,
                'name' => 'Upper Body Strength',
                'duration' => '45 min',
                'difficulty' => 'Intermediate',
                'completed' => false
            ],
            [
                'id' => 2,
                'name' => 'Cardio Blast',
                'duration' => '30 min',
                'difficulty' => 'Beginner',
                'completed' => true
            ],
            [
                'id' => 3,
                'name' => 'Lower Body Power',
                'duration' => '50 min',
                'difficulty' => 'Advanced',
                'completed' => false
            ]
        ]);
    }

    public function getProgress(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            'total_workouts' => 12,
            'total_hours' => 8.5,
            'progress_percentage' => 85
        ]);
    }
}
