<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['user', 'gym_owner', 'admin'])->default('user')->after('email');
            $table->string('phone')->nullable()->after('role');
            $table->string('location')->nullable()->after('phone');
            $table->string('profile_picture')->nullable()->after('location');
            $table->date('date_of_birth')->nullable()->after('profile_picture');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('date_of_birth');
            $table->text('bio')->nullable()->after('gender');
            $table->boolean('is_verified')->default(false)->after('bio');
            $table->timestamp('last_active_at')->nullable()->after('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role', 'phone', 'location', 'profile_picture', 
                'date_of_birth', 'gender', 'bio', 'is_verified', 'last_active_at'
            ]);
        });
    }
};
