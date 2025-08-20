<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Gym;
use App\Models\Instructor;
use App\Models\Routine;
use App\Models\Subscription;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Chat;
use App\Models\Message;
use App\Models\DeviceToken;
use App\Models\NotificationLog;
use App\Models\GymApplication;
use App\Models\FraudReport;
use Illuminate\Support\Facades\Hash;

class FitlinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@fitlink.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'phone' => '+2348012345678',
            'location' => 'Asaba, Delta State',
            'is_verified' => true,
        ]);

        // Create gym owner users
        $gymOwner1 = User::create([
            'name' => 'John Fitness',
            'email' => 'john@fitnesspro.com',
            'password' => Hash::make('password123'),
            'role' => 'gym_owner',
            'phone' => '+2348023456789',
            'location' => 'Asaba, Delta State',
            'is_verified' => true,
        ]);

        $gymOwner2 = User::create([
            'name' => 'Sarah Gym',
            'email' => 'sarah@elitegym.com',
            'password' => Hash::make('password123'),
            'role' => 'gym_owner',
            'phone' => '+2348034567890',
            'location' => 'Asaba, Delta State',
            'is_verified' => true,
        ]);

        // Create regular users
        $user1 = User::create([
            'name' => 'Mike Trainee',
            'email' => 'mike@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
            'phone' => '+2348045678901',
            'location' => 'Asaba, Delta State',
            'is_verified' => true,
        ]);

        $user2 = User::create([
            'name' => 'Lisa Workout',
            'email' => 'lisa@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
            'phone' => '+2348056789012',
            'location' => 'Asaba, Delta State',
            'is_verified' => true,
        ]);

        // Create gyms
        $gym1 = Gym::create([
            'name' => 'Fitness Pro Gym',
            'description' => 'Premium fitness facility with state-of-the-art equipment and expert trainers.',
            'address' => '123 Okpanam Road, Asaba',
            'city' => 'Asaba',
            'state' => 'Delta',
            'country' => 'Nigeria',
            'latitude' => 6.1833,
            'longitude' => 6.7500,
            'phone' => '+2348023456789',
            'email' => 'info@fitnesspro.com',
            'website' => 'https://fitnesspro.com',
            'amenities' => ['Cardio Equipment', 'Weight Training', 'Swimming Pool', 'Sauna', 'Group Classes'],
            'operating_hours' => [
                'monday' => '6:00 AM - 10:00 PM',
                'tuesday' => '6:00 AM - 10:00 PM',
                'wednesday' => '6:00 AM - 10:00 PM',
                'thursday' => '6:00 AM - 10:00 PM',
                'friday' => '6:00 AM - 10:00 PM',
                'saturday' => '7:00 AM - 8:00 PM',
                'sunday' => '8:00 AM - 6:00 PM',
            ],
            'status' => 'approved',
            'owner_id' => $gymOwner1->id,
            'is_verified' => true,
            'rating' => 4.8,
            'total_reviews' => 45,
        ]);

        $gym2 = Gym::create([
            'name' => 'Elite Fitness Center',
            'description' => 'Modern fitness center focusing on functional training and wellness.',
            'address' => '456 Nnebisi Road, Asaba',
            'city' => 'Asaba',
            'state' => 'Delta',
            'country' => 'Nigeria',
            'latitude' => 6.1850,
            'longitude' => 6.7480,
            'phone' => '+2348034567890',
            'email' => 'info@elitegym.com',
            'website' => 'https://elitegym.com',
            'amenities' => ['Functional Training', 'Yoga Studio', 'Pilates', 'Nutrition Counseling', 'Personal Training'],
            'operating_hours' => [
                'monday' => '5:30 AM - 11:00 PM',
                'tuesday' => '5:30 AM - 11:00 PM',
                'wednesday' => '5:30 AM - 11:00 PM',
                'thursday' => '5:30 AM - 11:00 PM',
                'friday' => '5:30 AM - 11:00 PM',
                'saturday' => '6:00 AM - 9:00 PM',
                'sunday' => '7:00 AM - 7:00 PM',
            ],
            'status' => 'approved',
            'owner_id' => $gymOwner2->id,
            'is_verified' => true,
            'rating' => 4.6,
            'total_reviews' => 32,
        ]);

        // Create instructors
        $instructor1 = Instructor::create([
            'name' => 'Coach David',
            'bio' => 'Certified personal trainer with 8 years of experience in strength training and bodybuilding.',
            'specialization' => 'Strength Training',
            'years_experience' => 8,
            'certifications' => ['NASM Certified Personal Trainer', 'ACE Strength Training Specialist'],
            'hourly_rate' => 5000.00,
            'availability_schedule' => [
                'monday' => ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
                'tuesday' => ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
                'wednesday' => ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
                'thursday' => ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
                'friday' => ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
            ],
            'is_available' => true,
            'status' => 'active',
            'gym_id' => $gym1->id,
            'rating' => 4.9,
            'total_reviews' => 28,
        ]);

        $instructor2 = Instructor::create([
            'name' => 'Coach Maria',
            'bio' => 'Yoga and Pilates instructor specializing in flexibility and core strength.',
            'specialization' => 'Yoga & Pilates',
            'years_experience' => 6,
            'certifications' => ['RYT-200 Yoga Alliance', 'Pilates Mat Instructor'],
            'hourly_rate' => 4000.00,
            'availability_schedule' => [
                'monday' => ['7:00 AM - 10:00 AM', '4:00 PM - 7:00 PM'],
                'tuesday' => ['7:00 AM - 10:00 AM', '4:00 PM - 7:00 PM'],
                'wednesday' => ['7:00 AM - 10:00 AM', '4:00 PM - 7:00 PM'],
                'thursday' => ['7:00 AM - 10:00 AM', '4:00 PM - 7:00 PM'],
                'friday' => ['7:00 AM - 10:00 AM', '4:00 PM - 7:00 PM'],
            ],
            'is_available' => true,
            'status' => 'active',
            'gym_id' => $gym2->id,
            'rating' => 4.7,
            'total_reviews' => 22,
        ]);

        // Create workout routines
        $routine1 = Routine::create([
            'name' => 'Full Body Strength',
            'description' => 'Complete full body workout targeting all major muscle groups.',
            'body_region' => 'full_body',
            'difficulty' => 'intermediate',
            'estimated_duration' => 60,
            'exercises' => [
                [
                    'name' => 'Squats',
                    'sets' => 3,
                    'reps' => 12,
                    'weight' => 'Bodyweight',
                    'rest' => '60 seconds'
                ],
                [
                    'name' => 'Push-ups',
                    'sets' => 3,
                    'reps' => 15,
                    'weight' => 'Bodyweight',
                    'rest' => '60 seconds'
                ],
                [
                    'name' => 'Deadlifts',
                    'sets' => 3,
                    'reps' => 10,
                    'weight' => 'Barbell',
                    'rest' => '90 seconds'
                ],
            ],
            'equipment_needed' => ['Barbell', 'Weight Plates', 'Pull-up Bar'],
            'target_muscles' => ['Quadriceps', 'Hamstrings', 'Glutes', 'Chest', 'Back', 'Shoulders'],
            'schedule_days' => ['monday', 'wednesday', 'friday'],
            'is_active' => true,
            'created_by' => $admin->id,
        ]);

        $routine2 = Routine::create([
            'name' => 'Core Strength & Stability',
            'description' => 'Focus on building a strong and stable core.',
            'body_region' => 'core',
            'difficulty' => 'beginner',
            'estimated_duration' => 30,
            'exercises' => [
                [
                    'name' => 'Plank',
                    'sets' => 3,
                    'duration' => '30 seconds',
                    'rest' => '30 seconds'
                ],
                [
                    'name' => 'Russian Twists',
                    'sets' => 3,
                    'reps' => 20,
                    'weight' => 'Medicine Ball',
                    'rest' => '30 seconds'
                ],
                [
                    'name' => 'Bicycle Crunches',
                    'sets' => 3,
                    'reps' => 15,
                    'rest' => '30 seconds'
                ],
            ],
            'equipment_needed' => ['Medicine Ball', 'Yoga Mat'],
            'target_muscles' => ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'],
            'schedule_days' => ['tuesday', 'thursday', 'saturday'],
            'is_active' => true,
            'created_by' => $admin->id,
        ]);

        // Create subscriptions
        $subscription1 = Subscription::create([
            'user_id' => $user1->id,
            'gym_id' => $gym1->id,
            'plan_type' => 'monthly',
            'amount' => 15000.00,
            'currency' => 'NGN',
            'start_date' => now(),
            'end_date' => now()->addMonth(),
            'status' => 'active',
            'auto_renew' => true,
            'features' => ['Access to all equipment', 'Group classes', 'Locker room access'],
        ]);

        $subscription2 = Subscription::create([
            'user_id' => $user2->id,
            'gym_id' => $gym2->id,
            'plan_type' => 'weekly',
            'amount' => 5000.00,
            'currency' => 'NGN',
            'start_date' => now(),
            'end_date' => now()->addWeek(),
            'status' => 'active',
            'auto_renew' => false,
            'features' => ['Access to yoga studio', 'Pilates classes', 'Wellness consultation'],
        ]);

        // Create bookings
        $booking1 = Booking::create([
            'user_id' => $user1->id,
            'instructor_id' => $instructor1->id,
            'gym_id' => $gym1->id,
            'booking_date' => now()->addDays(2),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'duration' => 60,
            'amount' => 5000.00,
            'currency' => 'NGN',
            'status' => 'confirmed',
            'payment_status' => 'paid',
        ]);

        $booking2 = Booking::create([
            'user_id' => $user2->id,
            'instructor_id' => $instructor2->id,
            'gym_id' => $gym2->id,
            'booking_date' => now()->addDays(3),
            'start_time' => '8:00:00',
            'end_time' => '9:00:00',
            'duration' => 60,
            'amount' => 4000.00,
            'currency' => 'NGN',
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        // Create payments
        $payment1 = Payment::create([
            'user_id' => $user1->id,
            'payable_type' => Subscription::class,
            'payable_id' => $subscription1->id,
            'payment_type' => 'subscription',
            'amount' => 15000.00,
            'currency' => 'NGN',
            'payment_method' => 'paystack',
            'gateway_reference' => 'PS_' . uniqid(),
            'transaction_id' => 'TXN_' . uniqid(),
            'status' => 'completed',
            'description' => 'Monthly subscription payment for Fitness Pro Gym',
            'paid_at' => now(),
        ]);

        $payment2 = Payment::create([
            'user_id' => $user1->id,
            'payable_type' => Booking::class,
            'payable_id' => $booking1->id,
            'payment_type' => 'booking',
            'amount' => 5000.00,
            'currency' => 'NGN',
            'payment_method' => 'paystack',
            'gateway_reference' => 'PS_' . uniqid(),
            'transaction_id' => 'TXN_' . uniqid(),
            'status' => 'completed',
            'description' => 'Personal training session with Coach David',
            'paid_at' => now(),
        ]);

        // Create chat between user and instructor
        $chat1 = Chat::create([
            'type' => 'user_instructor',
            'title' => 'Training Session Discussion',
            'is_active' => true,
            'last_message_at' => now(),
        ]);

        // Add participants to chat
        $chat1->participants()->attach($user1->id, [
            'role' => 'participant',
            'is_active' => true,
            'joined_at' => now(),
        ]);
        $chat1->participants()->attach($instructor1->id, [
            'role' => 'participant',
            'is_active' => true,
            'joined_at' => now(),
        ]);

        // Create messages in chat
        $message1 = Message::create([
            'chat_id' => $chat1->id,
            'sender_id' => $user1->id,
            'type' => 'text',
            'content' => 'Hi Coach David, I have a question about tomorrow\'s session.',
            'is_read' => true,
        ]);

        $message2 = Message::create([
            'chat_id' => $chat1->id,
            'sender_id' => $instructor1->id,
            'type' => 'text',
            'content' => 'Hello Mike! Sure, what would you like to know?',
            'is_read' => false,
        ]);

        // Create device tokens
        DeviceToken::create([
            'user_id' => $user1->id,
            'device_token' => 'device_token_' . uniqid(),
            'platform' => 'android',
            'device_id' => 'android_device_123',
            'device_model' => 'Samsung Galaxy S21',
            'os_version' => 'Android 12',
            'app_version' => '1.0.0',
            'is_active' => true,
            'last_used_at' => now(),
        ]);

        // Create notification logs
        NotificationLog::create([
            'user_id' => $user1->id,
            'type' => 'booking_reminder',
            'title' => 'Upcoming Training Session',
            'body' => 'Reminder: You have a training session with Coach David tomorrow at 10:00 AM.',
            'channel' => 'push',
            'status' => 'sent',
            'sent_at' => now(),
        ]);

        // Create gym application
        $gymApplication = GymApplication::create([
            'user_id' => $gymOwner1->id,
            'business_name' => 'Fitness Pro Gym',
            'business_description' => 'Premium fitness facility with state-of-the-art equipment.',
            'business_address' => '123 Okpanam Road, Asaba',
            'business_city' => 'Asaba',
            'business_state' => 'Delta',
            'business_country' => 'Nigeria',
            'business_phone' => '+2348023456789',
            'business_email' => 'info@fitnesspro.com',
            'business_website' => 'https://fitnesspro.com',
            'business_documents' => ['business_license.pdf', 'tax_clearance.pdf'],
            'business_licenses' => ['Fitness Center License', 'Health & Safety Certificate'],
            'status' => 'approved',
            'reviewed_by' => $admin->id,
            'reviewed_at' => now(),
            'approved_at' => now(),
        ]);

        // Create fraud report
        FraudReport::create([
            'reporter_id' => $user1->id,
            'reportable_type' => User::class,
            'reportable_id' => $user2->id,
            'report_type' => 'user',
            'severity' => 'medium',
            'title' => 'Suspicious User Behavior',
            'description' => 'User has been making multiple fake bookings and cancellations.',
            'status' => 'pending',
        ]);

        $this->command->info('Fitlink sample data seeded successfully!');
        $this->command->info('Admin: admin@fitlink.com / password123');
        $this->command->info('Gym Owner: john@fitnesspro.com / password123');
        $this->command->info('User: mike@example.com / password123');
    }
}
