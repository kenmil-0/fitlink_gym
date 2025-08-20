<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FraudReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'reporter_id',
        'reportable_type',
        'reportable_id',
        'report_type',
        'severity',
        'title',
        'description',
        'evidence',
        'status',
        'investigation_notes',
        'resolution_notes',
        'assigned_to',
        'resolved_by',
        'assigned_at',
        'investigation_started_at',
        'resolved_at',
    ];

    protected $casts = [
        'evidence' => 'array',
        'assigned_at' => 'datetime',
        'investigation_started_at' => 'datetime',
        'resolved_at' => 'datetime',
    ];

    /**
     * Get the user who reported this fraud.
     */
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /**
     * Get the parent reportable model (user, gym, instructor, etc.).
     */
    public function reportable()
    {
        return $this->morphTo();
    }

    /**
     * Get the admin assigned to investigate this report.
     */
    public function assignedAdmin()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Get the admin who resolved this report.
     */
    public function resolvedBy()
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    /**
     * Check if report is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if report is under investigation.
     */
    public function isUnderInvestigation(): bool
    {
        return $this->status === 'under_investigation';
    }

    /**
     * Check if report is resolved.
     */
    public function isResolved(): bool
    {
        return $this->status === 'resolved';
    }

    /**
     * Check if report is dismissed.
     */
    public function isDismissed(): bool
    {
        return $this->status === 'dismissed';
    }

    /**
     * Check if report is escalated.
     */
    public function isEscalated(): bool
    {
        return $this->status === 'escalated';
    }

    /**
     * Check if report is critical severity.
     */
    public function isCritical(): bool
    {
        return $this->severity === 'critical';
    }

    /**
     * Check if report is high severity.
     */
    public function isHigh(): bool
    {
        return $this->severity === 'high';
    }

    /**
     * Assign report to an admin.
     */
    public function assignTo($adminId)
    {
        $this->update([
            'assigned_to' => $adminId,
            'assigned_at' => now(),
        ]);
    }

    /**
     * Start investigation.
     */
    public function startInvestigation()
    {
        $this->update([
            'status' => 'under_investigation',
            'investigation_started_at' => now(),
        ]);
    }

    /**
     * Resolve the report.
     */
    public function resolve($adminId, $notes = null)
    {
        $this->update([
            'status' => 'resolved',
            'resolved_by' => $adminId,
            'resolved_at' => now(),
            'resolution_notes' => $notes,
        ]);
    }

    /**
     * Dismiss the report.
     */
    public function dismiss($adminId, $notes = null)
    {
        $this->update([
            'status' => 'dismissed',
            'resolved_by' => $adminId,
            'resolved_at' => now(),
            'resolution_notes' => $notes,
        ]);
    }

    /**
     * Escalate the report.
     */
    public function escalate($adminId, $notes = null)
    {
        $this->update([
            'status' => 'escalated',
            'resolved_by' => $adminId,
            'resolved_at' => now(),
            'resolution_notes' => $notes,
        ]);
    }

    /**
     * Scope a query to only include pending reports.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include reports under investigation.
     */
    public function scopeUnderInvestigation($query)
    {
        return $query->where('status', 'under_investigation');
    }

    /**
     * Scope a query to only include resolved reports.
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Scope a query to only include dismissed reports.
     */
    public function scopeDismissed($query)
    {
        return $query->where('status', 'dismissed');
    }

    /**
     * Scope a query to only include escalated reports.
     */
    public function scopeEscalated($query)
    {
        return $query->where('status', 'escalated');
    }

    /**
     * Scope a query to only include reports of a specific type.
     */
    public function scopeReportType($query, $type)
    {
        return $query->where('report_type', $type);
    }

    /**
     * Scope a query to only include reports of a specific severity.
     */
    public function scopeSeverity($query, $severity)
    {
        return $query->where('severity', $severity);
    }

    /**
     * Scope a query to only include critical reports.
     */
    public function scopeCritical($query)
    {
        return $query->where('severity', 'critical');
    }

    /**
     * Scope a query to only include high severity reports.
     */
    public function scopeHigh($query)
    {
        return $query->where('severity', 'high');
    }

    /**
     * Scope a query to only include reports within a date range.
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }
}
