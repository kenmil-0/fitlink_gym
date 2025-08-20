<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Payment Gateway Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains configuration for payment gateways used in the
    | Fitlink gym management system.
    |
    */

    'default' => env('PAYMENT_GATEWAY', 'paystack'),

    'gateways' => [
        'paystack' => [
            'name' => 'Paystack',
            'public_key' => env('PAYSTACK_PUBLIC_KEY'),
            'secret_key' => env('PAYSTACK_SECRET_KEY'),
            'merchant_email' => env('PAYSTACK_MERCHANT_EMAIL'),
            'webhook_secret' => env('PAYSTACK_WEBHOOK_SECRET'),
            'base_url' => env('PAYSTACK_BASE_URL', 'https://api.paystack.co'),
            'currency' => 'NGN',
            'supported_currencies' => ['NGN', 'USD', 'GHS', 'ZAR'],
        ],

        'flutterwave' => [
            'name' => 'Flutterwave',
            'public_key' => env('FLUTTERWAVE_PUBLIC_KEY'),
            'secret_key' => env('FLUTTERWAVE_SECRET_KEY'),
            'merchant_id' => env('FLUTTERWAVE_MERCHANT_ID'),
            'webhook_secret' => env('FLUTTERWAVE_WEBHOOK_SECRET'),
            'base_url' => env('FLUTTERWAVE_BASE_URL', 'https://api.flutterwave.com/v3'),
            'currency' => 'NGN',
            'supported_currencies' => ['NGN', 'USD', 'GBP', 'EUR', 'GHS', 'ZAR', 'KES'],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Subscription Plans Configuration
    |--------------------------------------------------------------------------
    |
    | Default subscription plans and pricing for gym memberships.
    |
    */

    'subscription_plans' => [
        'daily' => [
            'name' => 'Daily Pass',
            'duration' => 1,
            'duration_unit' => 'day',
            'price' => 500.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for one day',
        ],
        'weekly' => [
            'name' => 'Weekly Pass',
            'duration' => 7,
            'duration_unit' => 'days',
            'price' => 2500.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for one week',
        ],
        'bi_weekly' => [
            'name' => 'Bi-Weekly Pass',
            'duration' => 14,
            'duration_unit' => 'days',
            'price' => 4500.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for two weeks',
        ],
        'monthly' => [
            'name' => 'Monthly Pass',
            'duration' => 30,
            'duration_unit' => 'days',
            'price' => 8000.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for one month',
        ],
        'quarterly' => [
            'name' => 'Quarterly Pass',
            'duration' => 90,
            'duration_unit' => 'days',
            'price' => 22000.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for three months',
        ],
        'half_year' => [
            'name' => 'Half Year Pass',
            'duration' => 180,
            'duration_unit' => 'days',
            'price' => 40000.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for six months',
        ],
        'yearly' => [
            'name' => 'Yearly Pass',
            'duration' => 365,
            'duration_unit' => 'days',
            'price' => 70000.00,
            'currency' => 'NGN',
            'description' => 'Access to gym for one year',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Instructor Session Pricing
    |--------------------------------------------------------------------------
    |
    | Default pricing for instructor sessions.
    |
    */

    'instructor_sessions' => [
        'default_hourly_rate' => 5000.00,
        'currency' => 'NGN',
        'session_durations' => [
            30 => '30 minutes',
            60 => '1 hour',
            90 => '1.5 hours',
            120 => '2 hours',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Payment Processing
    |--------------------------------------------------------------------------
    |
    | Configuration for payment processing and webhooks.
    |
    */

    'processing' => [
        'webhook_timeout' => 30, // seconds
        'retry_attempts' => 3,
        'retry_delay' => 60, // seconds
        
        'status_mapping' => [
            'paystack' => [
                'success' => 'completed',
                'failed' => 'failed',
                'abandoned' => 'cancelled',
                'pending' => 'pending',
            ],
            'flutterwave' => [
                'successful' => 'completed',
                'failed' => 'failed',
                'cancelled' => 'cancelled',
                'pending' => 'pending',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Refund Policy
    |--------------------------------------------------------------------------
    |
    | Configuration for refund processing.
    |
    */

    'refunds' => [
        'allowed_within_hours' => 24,
        'processing_fee_percentage' => 2.5,
        'minimum_refund_amount' => 100.00,
    ],
];
