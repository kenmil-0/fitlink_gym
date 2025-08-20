<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'body_region',
        'difficulty',
        'estimated_duration',
        'exercises',
        'equipment_needed',
        'target_muscles',
        'video_url',
        'thumbnail',
        'schedule_days',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'exercises' => 'array',
        'equipment_needed' => 'array',
        'target_muscles' => 'array',
        'schedule_days' => 'array',
        'estimated_duration' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Get the user who created this routine.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope a query to only include active routines.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include routines for a specific body region.
     */
    public function scopeBodyRegion($query, $region)
    {
        return $query->where('body_region', $region);
    }

    /**
     * Scope a query to only include routines of a specific difficulty.
     */
    public function scopeDifficulty($query, $difficulty)
    {
        return $query->where('difficulty', $difficulty);
    }

    /**
     * Scope a query to only include routines scheduled for specific days.
     */
    public function scopeScheduledFor($query, $day)
    {
        return $query->whereJsonContains('schedule_days', $day);
    }

    /**
     * Scope a query to only include routines within a duration range.
     */
    public function scopeDurationRange($query, $min, $max)
    {
        return $query->whereBetween('estimated_duration', [$min, $max]);
    }
}
