<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GymApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'business_description',
        'business_address',
        'business_city',
        'business_state',
        'business_country',
        'business_latitude',
        'business_longitude',
        'business_phone',
        'business_email',
        'business_website',
        'business_documents',
        'business_licenses',
        'status',
        'admin_notes',
        'rejection_reason',
        'reviewed_by',
        'reviewed_at',
        'approved_at',
        'rejected_at',
    ];

    protected $casts = [
        'business_latitude' => 'decimal:8',
        'business_longitude' => 'decimal:8',
        'business_documents' => 'array',
        'business_licenses' => 'array',
        'reviewed_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    /**
     * Get the user who submitted this application.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who reviewed this application.
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Check if application is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if application is under review.
     */
    public function isUnderReview(): bool
    {
        return $this->status === 'under_review';
    }

    /**
     * Check if application is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if application is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if application requires changes.
     */
    public function requiresChanges(): bool
    {
        return $this->status === 'requires_changes';
    }

    /**
     * Approve the application.
     */
    public function approve($adminId)
    {
        $this->update([
            'status' => 'approved',
            'reviewed_by' => $adminId,
            'reviewed_at' => now(),
            'approved_at' => now(),
        ]);
    }

    /**
     * Reject the application.
     */
    public function reject($adminId, $reason = null)
    {
        $this->update([
            'status' => 'rejected',
            'reviewed_by' => $adminId,
            'reviewed_at' => now(),
            'rejected_at' => now(),
            'rejection_reason' => $reason,
        ]);
    }

    /**
     * Mark application as requiring changes.
     */
    public function requireChanges($adminId, $notes = null)
    {
        $this->update([
            'status' => 'requires_changes',
            'reviewed_by' => $adminId,
            'reviewed_at' => now(),
            'admin_notes' => $notes,
        ]);
    }

    /**
     * Scope a query to only include pending applications.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved applications.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include rejected applications.
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope a query to only include applications requiring changes.
     */
    public function scopeRequiresChanges($query)
    {
        return $query->where('status', 'requires_changes');
    }

    /**
     * Scope a query to only include applications in a specific city.
     */
    public function scopeInCity($query, $city)
    {
        return $query->where('business_city', $city);
    }

    /**
     * Scope a query to only include applications within a date range.
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }
}
