<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'bio',
        'specialization',
        'years_experience',
        'certifications',
        'profile_picture',
        'images',
        'hourly_rate',
        'availability_schedule',
        'is_available',
        'status',
        'gym_id',
        'user_id',
        'rating',
        'total_reviews',
    ];

    protected $casts = [
        'certifications' => 'array',
        'images' => 'array',
        'availability_schedule' => 'array',
        'hourly_rate' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_available' => 'boolean',
        'years_experience' => 'integer',
    ];

    /**
     * Get the gym that employs this instructor.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    /**
     * Get the user account associated with this instructor.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the bookings for this instructor.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Scope a query to only include available instructors.
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    /**
     * Scope a query to only include active instructors.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include instructors with a specific specialization.
     */
    public function scopeSpecialization($query, $specialization)
    {
        return $query->where('specialization', $specialization);
    }

    /**
     * Scope a query to only include instructors within a price range.
     */
    public function scopePriceRange($query, $min, $max)
    {
        return $query->whereBetween('hourly_rate', [$min, $max]);
    }
}
