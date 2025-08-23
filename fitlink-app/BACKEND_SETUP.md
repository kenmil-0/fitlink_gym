# Laravel Backend Setup Guide

This guide will help you set up the Laravel backend API for the Fitlink React Native app.

## Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL
- Laravel 10

## 1. Install Laravel Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

## 2. Update Kernel.php

Add Sanctum middleware to `app/Http/Kernel.php`:

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

## 3. Create AuthController

Create `app/Http/Controllers/AuthController.php`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:member,trainer,gym_owner'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function refresh(Request $request)
    {
        $user = $request->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
```

## 4. Update User Model

Update `app/Models/User.php`:

```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```

## 5. Create Database Migration

Create a migration to add the role column:

```bash
php artisan make:migration add_role_to_users_table
```

Update the migration file:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('member');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
```

Run the migration:

```bash
php artisan migrate
```

## 6. Create API Routes

Update `routes/api.php`:

```php
<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Auth routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'me']);
        
        // Member routes
        Route::prefix('member')->group(function () {
            Route::get('/subscription', [MemberController::class, 'getSubscription']);
            Route::get('/workouts', [MemberController::class, 'getWorkouts']);
            Route::get('/progress', [MemberController::class, 'getProgress']);
        });

        // Trainer routes
        Route::prefix('trainer')->group(function () {
            Route::get('/clients', [TrainerController::class, 'getClients']);
            Route::get('/routines', [TrainerController::class, 'getRoutines']);
            Route::post('/routines', [TrainerController::class, 'createRoutine']);
        });

        // Gym Owner routes
        Route::prefix('gym-owner')->group(function () {
            Route::get('/members', [GymOwnerController::class, 'getMembers']);
            Route::get('/revenue', [GymOwnerController::class, 'getRevenue']);
            Route::get('/subscriptions', [GymOwnerController::class, 'getSubscriptions']);
        });
    });
});
```

## 7. Create Sample Controllers

### MemberController

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function getSubscription(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            'status' => 'active',
            'plan' => 'Premium',
            'expires_at' => '2024-12-31'
        ]);
    }

    public function getWorkouts(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            [
                'id' => 1,
                'name' => 'Upper Body Strength',
                'duration' => '45 min',
                'difficulty' => 'Intermediate',
                'completed' => false
            ],
            [
                'id' => 2,
                'name' => 'Cardio Blast',
                'duration' => '30 min',
                'difficulty' => 'Beginner',
                'completed' => true
            ]
        ]);
    }

    public function getProgress(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            'total_workouts' => 12,
            'total_hours' => 8.5,
            'progress_percentage' => 85
        ]);
    }
}
```

### TrainerController

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrainerController extends Controller
{
    public function getClients(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            [
                'id' => 1,
                'name' => 'Sarah Johnson',
                'progress' => 75,
                'last_workout' => '2 days ago',
                'email' => 'sarah@example.com'
            ],
            [
                'id' => 2,
                'name' => 'Mike Chen',
                'progress' => 60,
                'last_workout' => '1 day ago',
                'email' => 'mike@example.com'
            ]
        ]);
    }

    public function getRoutines(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            [
                'id' => 1,
                'name' => 'Beginner Strength',
                'client_count' => 8,
                'duration' => '6 weeks',
                'difficulty' => 'Beginner'
            ],
            [
                'id' => 2,
                'name' => 'Advanced Cardio',
                'client_count' => 5,
                'duration' => '4 weeks',
                'difficulty' => 'Advanced'
            ]
        ]);
    }

    public function createRoutine(Request $request)
    {
        // Implement routine creation logic
        return response()->json(['message' => 'Routine created successfully']);
    }
}
```

### GymOwnerController

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GymOwnerController extends Controller
{
    public function getMembers(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            [
                'id' => 1,
                'name' => 'John Smith',
                'plan' => 'Premium',
                'status' => 'active',
                'join_date' => '2024-01-15',
                'email' => 'john@example.com'
            ],
            [
                'id' => 2,
                'name' => 'Lisa Brown',
                'plan' => 'Basic',
                'status' => 'active',
                'join_date' => '2024-02-01',
                'email' => 'lisa@example.com'
            ]
        ]);
    }

    public function getRevenue(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            ['month' => 'Jan', 'amount' => 12500],
            ['month' => 'Feb', 'amount' => 13800],
            ['month' => 'Mar', 'amount' => 14200]
        ]);
    }

    public function getSubscriptions(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            [
                'id' => 1,
                'member_name' => 'John Smith',
                'plan' => 'Premium',
                'status' => 'active',
                'amount' => 99.99
            ]
        ]);
    }
}
```

## 8. Configure CORS

Update `config/cors.php` to allow requests from your React Native app:

```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

## 9. Start the Server

```bash
php artisan serve
```

Your Laravel API will be available at `http://localhost:8000/api/v1`

## 10. Test the API

You can test the endpoints using tools like Postman or curl:

```bash
# Register a new user
curl -X POST http://localhost:8000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password","role":"member"}'

# Login
curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## Next Steps

1. Replace mock data with actual database queries
2. Add proper validation and error handling
3. Implement real business logic for each endpoint
4. Add database migrations for workouts, subscriptions, etc.
5. Set up proper authentication middleware for role-based access
6. Add logging and monitoring
7. Implement push notifications using Firebase
