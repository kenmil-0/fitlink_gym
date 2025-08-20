<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Firebase Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains configuration for Firebase services used in the
    | Fitlink gym management system for push notifications and chat.
    |
    */

    'project_id' => env('FIREBASE_PROJECT_ID'),
    'private_key_id' => env('FIREBASE_PRIVATE_KEY_ID'),
    'private_key' => env('FIREBASE_PRIVATE_KEY'),
    'client_email' => env('FIREBASE_CLIENT_EMAIL'),
    'client_id' => env('FIREBASE_CLIENT_ID'),
    'auth_uri' => env('FIREBASE_AUTH_URI', 'https://accounts.google.com/o/oauth2/auth'),
    'token_uri' => env('FIREBASE_TOKEN_URI', 'https://oauth2.googleapis.com/token'),
    'auth_provider_x509_cert_url' => env('FIREBASE_AUTH_PROVIDER_X509_CERT_URL', 'https://www.googleapis.com/oauth2/v1/certs'),
    'client_x509_cert_url' => env('FIREBASE_CLIENT_X509_CERT_URL'),

    /*
    |--------------------------------------------------------------------------
    | Firebase Cloud Messaging (FCM)
    |--------------------------------------------------------------------------
    |
    | Configuration for push notifications.
    |
    */

    'fcm' => [
        'server_key' => env('FIREBASE_SERVER_KEY'),
        'legacy_server_key' => env('FIREBASE_LEGACY_SERVER_KEY'),
        'default_topic' => 'general',
        
        'notification_types' => [
            'subscription_expiry' => [
                'title' => 'Subscription Expiring Soon',
                'body' => 'Your gym subscription expires in {days} days. Renew now to continue your fitness journey!',
                'icon' => 'notification_icon',
                'color' => '#FF6B6B',
            ],
            'booking_reminder' => [
                'title' => 'Upcoming Training Session',
                'body' => 'Reminder: You have a training session with {instructor} tomorrow at {time}.',
                'icon' => 'notification_icon',
                'color' => '#4ECDC4',
            ],
            'payment_success' => [
                'title' => 'Payment Successful',
                'body' => 'Your payment of {amount} has been processed successfully. Thank you!',
                'icon' => 'notification_icon',
                'color' => '#45B7D1',
            ],
            'payment_failed' => [
                'title' => 'Payment Failed',
                'body' => 'Your payment of {amount} could not be processed. Please try again.',
                'icon' => 'notification_icon',
                'color' => '#FF6B6B',
            ],
            'gym_approval' => [
                'title' => 'Gym Application Update',
                'body' => 'Your gym application has been {status}. {message}',
                'icon' => 'notification_icon',
                'color' => '#96CEB4',
            ],
            'instructor_booking' => [
                'title' => 'New Booking Request',
                'body' => 'You have a new booking request from {user} for {date} at {time}.',
                'icon' => 'notification_icon',
                'color' => '#FFEAA7',
            ],
            'promotional' => [
                'title' => 'Special Offer',
                'body' => '{message}',
                'icon' => 'notification_icon',
                'color' => '#DDA0DD',
            ],
            'system' => [
                'title' => 'System Notification',
                'body' => '{message}',
                'icon' => 'notification_icon',
                'color' => '#98D8C8',
            ],
        ],

        'priority' => [
            'high' => 'high',
            'normal' => 'normal',
        ],

        'sound' => [
            'default' => 'default',
            'notification' => 'notification_sound',
        ],

        'badge' => [
            'enabled' => true,
            'default' => 1,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Firebase Realtime Database
    |--------------------------------------------------------------------------
    |
    | Configuration for real-time chat functionality.
    |
    */

    'database' => [
        'url' => env('FIREBASE_DATABASE_URL'),
        'rules' => [
            'chats' => [
                'read' => 'auth != null && (data.child("participants").child(auth.uid).exists() || root.child("users").child(auth.uid).child("role").val() == "admin")',
                'write' => 'auth != null && (data.child("participants").child(auth.uid).exists() || root.child("users").child(auth.uid).child("role").val() == "admin")',
            ],
            'messages' => [
                'read' => 'auth != null && root.child("chats").child(data.child("chat_id").val()).child("participants").child(auth.uid).exists()',
                'write' => 'auth != null && root.child("chats").child(data.child("chat_id").val()).child("participants").child(auth.uid).exists()',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Firebase Authentication
    |--------------------------------------------------------------------------
    |
    | Configuration for user authentication (if needed for mobile app).
    |
    */

    'auth' => [
        'enabled' => env('FIREBASE_AUTH_ENABLED', false),
        'providers' => [
            'email' => true,
            'phone' => true,
            'google' => false,
            'facebook' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Notification Templates
    |--------------------------------------------------------------------------
    |
    | Pre-defined notification templates for different scenarios.
    |
    */

    'templates' => [
        'subscription_expiry_warning' => [
            'title' => 'Subscription Expiring Soon',
            'body' => 'Your {plan_type} subscription at {gym_name} expires on {expiry_date}. Renew now to avoid interruption.',
            'action' => 'Renew Subscription',
            'action_url' => '/subscriptions/renew',
        ],
        'new_booking_confirmation' => [
            'title' => 'Booking Confirmed',
            'body' => 'Your training session with {instructor_name} at {gym_name} on {date} at {time} has been confirmed.',
            'action' => 'View Details',
            'action_url' => '/bookings/{id}',
        ],
        'payment_reminder' => [
            'title' => 'Payment Due',
            'body' => 'Your subscription payment of {amount} is due on {due_date}. Please complete payment to continue access.',
            'action' => 'Pay Now',
            'action_url' => '/payments/new',
        ],
        'gym_application_status' => [
            'title' => 'Application Status Update',
            'body' => 'Your gym application for {gym_name} has been {status}. {additional_message}',
            'action' => 'View Details',
            'action_url' => '/gym-applications/{id}',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Delivery Settings
    |--------------------------------------------------------------------------
    |
    | Configuration for notification delivery and retry logic.
    |
    */

    'delivery' => [
        'retry_attempts' => 3,
        'retry_delay' => 60, // seconds
        'batch_size' => 1000,
        'timeout' => 30, // seconds
        
        'channels' => [
            'push' => [
                'enabled' => true,
                'priority' => 'high',
            ],
            'email' => [
                'enabled' => env('FIREBASE_EMAIL_ENABLED', false),
                'template_id' => env('FIREBASE_EMAIL_TEMPLATE_ID'),
            ],
            'sms' => [
                'enabled' => env('FIREBASE_SMS_ENABLED', false),
                'provider' => env('FIREBASE_SMS_PROVIDER', 'twilio'),
            ],
        ],
    ],
];
