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
        Schema::create('instructors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('bio')->nullable();
            $table->string('specialization');
            $table->integer('years_experience')->default(0);
            $table->json('certifications')->nullable();
            $table->string('profile_picture')->nullable();
            $table->json('images')->nullable();
            $table->decimal('hourly_rate', 10, 2)->default(0.00);
            $table->json('availability_schedule')->nullable();
            $table->boolean('is_available')->default(true);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->foreignId('gym_id')->constrained('gyms')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->integer('total_reviews')->default(0);
            $table->timestamps();
            
            $table->index(['gym_id', 'status']);
            $table->index(['specialization', 'is_available']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instructors');
    }
};
