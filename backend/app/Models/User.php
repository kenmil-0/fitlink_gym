<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'location',
        'profile_picture',
        'date_of_birth',
        'gender',
        'bio',
        'is_verified',
        'last_active_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'last_active_at' => 'datetime',
        ];
    }

    /**
     * Get the gyms owned by this user.
     */
    public function ownedGyms()
    {
        return $this->hasMany(Gym::class, 'owner_id');
    }

    /**
     * Get the gym applications submitted by this user.
     */
    public function gymApplications()
    {
        return $this->hasMany(GymApplication::class);
    }

    /**
     * Get the subscriptions for this user.
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Get the bookings made by this user.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the payments made by this user.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get the messages sent by this user.
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Get the chats this user participates in.
     */
    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'chat_participants')
                    ->withPivot('role', 'is_active', 'joined_at', 'left_at')
                    ->withTimestamps();
    }

    /**
     * Get the device tokens for this user.
     */
    public function deviceTokens()
    {
        return $this->hasMany(DeviceToken::class);
    }

    /**
     * Get the notification logs for this user.
     */
    public function notificationLogs()
    {
        return $this->hasMany(NotificationLog::class);
    }

    /**
     * Check if user is a gym owner.
     */
    public function isGymOwner(): bool
    {
        return $this->role === 'gym_owner';
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is a regular user.
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }
}
