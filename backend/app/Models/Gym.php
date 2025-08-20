<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'city',
        'state',
        'country',
        'latitude',
        'longitude',
        'phone',
        'email',
        'website',
        'logo',
        'images',
        'amenities',
        'operating_hours',
        'status',
        'owner_id',
        'is_verified',
        'verified_at',
        'rating',
        'total_reviews',
    ];

    protected $casts = [
        'images' => 'array',
        'amenities' => 'array',
        'operating_hours' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'rating' => 'decimal:2',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    /**
     * Get the owner of the gym.
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the instructors for this gym.
     */
    public function instructors()
    {
        return $this->hasMany(Instructor::class);
    }

    /**
     * Get the subscriptions for this gym.
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Get the bookings for this gym.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the gym application for this gym.
     */
    public function application()
    {
        return $this->hasOne(GymApplication::class, 'user_id', 'owner_id');
    }

    /**
     * Scope a query to only include approved gyms.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include gyms in a specific city.
     */
    public function scopeInCity($query, $city)
    {
        return $query->where('city', $city);
    }

    /**
     * Scope a query to only include verified gyms.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }
}
