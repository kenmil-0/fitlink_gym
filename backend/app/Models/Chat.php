<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'avatar',
        'metadata',
        'is_active',
        'last_message_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean',
        'last_message_at' => 'datetime',
    ];

    /**
     * Get the participants in this chat.
     */
    public function participants()
    {
        return $this->belongsToMany(User::class, 'chat_participants')
                    ->withPivot('role', 'is_active', 'joined_at', 'left_at')
                    ->withTimestamps();
    }

    /**
     * Get the messages in this chat.
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * Get the latest message in this chat.
     */
    public function latestMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    /**
     * Get unread messages count for a specific user.
     */
    public function unreadCountForUser($userId)
    {
        return $this->messages()
                    ->where('sender_id', '!=', $userId)
                    ->where('is_read', false)
                    ->count();
    }

    /**
     * Scope a query to only include active chats.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include chats of a specific type.
     */
    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope a query to only include chats with recent activity.
     */
    public function scopeRecent($query, $days = 7)
    {
        return $query->where('last_message_at', '>=', now()->subDays($days));
    }
}
