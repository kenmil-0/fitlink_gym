<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\GymController;
use App\Http\Controllers\Api\V1\InstructorController;
use App\Http\Controllers\Api\V1\RoutineController;
use App\Http\Controllers\Api\V1\SubscriptionController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\ChatController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\Admin\GymApprovalController;
use App\Http\Controllers\Api\V1\Admin\FraudReportController;
use App\Http\Controllers\Api\V1\MemberController;
use App\Http\Controllers\Api\V1\TrainerController;
use App\Http\Controllers\Api\V1\GymOwnerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API Version 1 Routes
Route::prefix('v1')->group(function () {
    
    // Test route to verify connection
    Route::get('/test', function () {
        return response()->json([
            'message' => 'Fitlink API is working!',
            'timestamp' => now(),
            'status' => 'success',
            'version' => '1.0.0'
        ]);
    });
    
    // Public routes (no authentication required)
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
    
    // Gym discovery (public)
    Route::get('/gyms', [GymController::class, 'index']);
    Route::get('/gyms/{gym}', [GymController::class, 'show']);
    Route::get('/gyms/{gym}/instructors', [GymController::class, 'instructors']);
    
    // Routine browsing (public)
    Route::get('/routines', [RoutineController::class, 'index']);
    Route::get('/routines/{routine}', [RoutineController::class, 'show']);
    
    // Protected routes (authentication required)
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth routes
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::post('/auth/refresh', [AuthController::class, 'refresh']);
        Route::get('/auth/profile', [AuthController::class, 'profile']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
        Route::put('/auth/change-password', [AuthController::class, 'changePassword']);
        
        // Device token management
        Route::post('/auth/device-token', [AuthController::class, 'storeDeviceToken']);
        Route::delete('/auth/device-token/{token}', [AuthController::class, 'removeDeviceToken']);
        
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
        
        // Gym management (for gym owners)
        Route::middleware('role:gym_owner')->group(function () {
            Route::post('/gyms', [GymController::class, 'store']);
            Route::put('/gyms/{gym}', [GymController::class, 'update']);
            Route::delete('/gyms/{gym}', [GymController::class, 'destroy']);
            Route::get('/my-gyms', [GymController::class, 'myGyms']);
            Route::get('/my-gyms/{gym}/analytics', [GymController::class, 'analytics']);
        });
        
        // Instructor management (for gym owners)
        Route::middleware('role:gym_owner')->group(function () {
            Route::post('/instructors', [InstructorController::class, 'store']);
            Route::put('/instructors/{instructor}', [InstructorController::class, 'update']);
            Route::delete('/instructors/{instructor}', [InstructorController::class, 'destroy']);
            Route::get('/my-instructors', [InstructorController::class, 'myInstructors']);
        });
        
        // Instructor routes (for instructors)
        Route::middleware('role:instructor')->group(function () {
            Route::get('/instructor/profile', [InstructorController::class, 'profile']);
            Route::put('/instructor/profile', [InstructorController::class, 'updateProfile']);
            Route::get('/instructor/bookings', [InstructorController::class, 'myBookings']);
            Route::put('/instructor/bookings/{booking}/confirm', [InstructorController::class, 'confirmBooking']);
            Route::put('/instructor/bookings/{booking}/complete', [InstructorController::class, 'completeBooking']);
        });
        
        // User subscriptions
        Route::get('/subscriptions', [SubscriptionController::class, 'index']);
        Route::get('/subscriptions/{subscription}', [SubscriptionController::class, 'show']);
        Route::post('/subscriptions', [SubscriptionController::class, 'store']);
        Route::put('/subscriptions/{subscription}/cancel', [SubscriptionController::class, 'cancel']);
        Route::put('/subscriptions/{subscription}/renew', [SubscriptionController::class, 'renew']);
        
        // User bookings
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/bookings/{booking}', [BookingController::class, 'show']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::put('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
        
        // Payments
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::get('/payments/{payment}', [PaymentController::class, 'show']);
        Route::post('/payments/verify', [PaymentController::class, 'verifyPayment']);
        
        // Chat system
        Route::get('/chats', [ChatController::class, 'index']);
        Route::post('/chats', [ChatController::class, 'store']);
        Route::get('/chats/{chat}', [ChatController::class, 'show']);
        Route::get('/chats/{chat}/messages', [ChatController::class, 'messages']);
        Route::post('/chats/{chat}/messages', [ChatController::class, 'sendMessage']);
        Route::put('/chats/{chat}/messages/{message}/read', [ChatController::class, 'markAsRead']);
        
        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::get('/notifications/{notification}', [NotificationController::class, 'show']);
        Route::put('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
        Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        
        // Gym applications
        Route::post('/gym-applications', [GymApprovalController::class, 'store']);
        Route::get('/gym-applications/my-application', [GymApprovalController::class, 'myApplication']);
        
        // Fraud reports
        Route::post('/fraud-reports', [FraudReportController::class, 'store']);
        Route::get('/fraud-reports/my-reports', [FraudReportController::class, 'myReports']);
        
        // Admin routes
        Route::middleware('role:admin')->prefix('admin')->group(function () {
            
            // Gym approval management
            Route::get('/gym-applications', [GymApprovalController::class, 'index']);
            Route::get('/gym-applications/{application}', [GymApprovalController::class, 'show']);
            Route::put('/gym-applications/{application}/approve', [GymApprovalController::class, 'approve']);
            Route::put('/gym-applications/{application}/reject', [GymApprovalController::class, 'reject']);
            Route::put('/gym-applications/{application}/require-changes', [GymApprovalController::class, 'requireChanges']);
            
            // Fraud report management
            Route::get('/fraud-reports', [FraudReportController::class, 'index']);
            Route::get('/fraud-reports/{report}', [FraudReportController::class, 'show']);
            Route::put('/fraud-reports/{report}/assign', [FraudReportController::class, 'assign']);
            Route::put('/fraud-reports/{report}/investigate', [FraudReportController::class, 'startInvestigation']);
            Route::put('/fraud-reports/{report}/resolve', [FraudReportController::class, 'resolve']);
            Route::put('/fraud-reports/{report}/dismiss', [FraudReportController::class, 'dismiss']);
            Route::put('/fraud-reports/{report}/escalate', [FraudReportController::class, 'escalate']);
            
            // System analytics
            Route::get('/analytics/overview', [GymApprovalController::class, 'analytics']);
            Route::get('/analytics/fraud-trends', [FraudReportController::class, 'analytics']);
        });
    });
});
