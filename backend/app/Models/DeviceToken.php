<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'device_token',
        'platform',
        'device_id',
        'device_model',
        'os_version',
        'app_version',
        'is_active',
        'last_used_at',
        'metadata',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'last_used_at' => 'datetime',
        'metadata' => 'array',
    ];

    /**
     * Get the user who owns this device token.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if device token is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if device is iOS.
     */
    public function isIOS(): bool
    {
        return $this->platform === 'ios';
    }

    /**
     * Check if device is Android.
     */
    public function isAndroid(): bool
    {
        return $this->platform === 'android';
    }

    /**
     * Check if device is web.
     */
    public function isWeb(): bool
    {
        return $this->platform === 'web';
    }

    /**
     * Mark device token as active.
     */
    public function activate()
    {
        $this->update([
            'is_active' => true,
            'last_used_at' => now(),
        ]);
    }

    /**
     * Mark device token as inactive.
     */
    public function deactivate()
    {
        $this->update([
            'is_active' => false,
        ]);
    }

    /**
     * Update last used timestamp.
     */
    public function updateLastUsed()
    {
        $this->update(['last_used_at' => now()]);
    }

    /**
     * Scope a query to only include active device tokens.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include device tokens for a specific platform.
     */
    public function scopePlatform($query, $platform)
    {
        return $query->where('platform', $platform);
    }

    /**
     * Scope a query to only include iOS device tokens.
     */
    public function scopeIOS($query)
    {
        return $query->where('platform', 'ios');
    }

    /**
     * Scope a query to only include Android device tokens.
     */
    public function scopeAndroid($query)
    {
        return $query->where('platform', 'android');
    }

    /**
     * Scope a query to only include web device tokens.
     */
    public function scopeWeb($query)
    {
        return $query->where('platform', 'web');
    }

    /**
     * Scope a query to only include recently used device tokens.
     */
    public function scopeRecentlyUsed($query, $days = 30)
    {
        return $query->where('last_used_at', '>=', now()->subDays($days));
    }
}
