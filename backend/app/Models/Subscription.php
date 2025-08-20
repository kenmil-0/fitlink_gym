<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'gym_id',
        'plan_type',
        'amount',
        'currency',
        'start_date',
        'end_date',
        'status',
        'auto_renew',
        'last_payment_at',
        'next_payment_at',
        'features',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'amount' => 'decimal:2',
        'auto_renew' => 'boolean',
        'last_payment_at' => 'datetime',
        'next_payment_at' => 'datetime',
        'features' => 'array',
    ];

    /**
     * Get the user who has this subscription.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the gym for this subscription.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    /**
     * Get the payments for this subscription.
     */
    public function payments()
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    /**
     * Check if subscription is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active' && $this->end_date->isFuture();
    }

    /**
     * Check if subscription is expired.
     */
    public function isExpired(): bool
    {
        return $this->end_date->isPast();
    }

    /**
     * Check if subscription expires soon (within 7 days).
     */
    public function expiresSoon(): bool
    {
        return $this->end_date->diffInDays(now()) <= 7;
    }

    /**
     * Scope a query to only include active subscriptions.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include expired subscriptions.
     */
    public function scopeExpired($query)
    {
        return $query->where('status', 'expired');
    }

    /**
     * Scope a query to only include subscriptions expiring soon.
     */
    public function scopeExpiringSoon($query)
    {
        return $query->where('end_date', '<=', now()->addDays(7));
    }
}
