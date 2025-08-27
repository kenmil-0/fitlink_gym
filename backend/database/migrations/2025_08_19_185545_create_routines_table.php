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
        Schema::create('routines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('body_region', ['full_body', 'upper_body', 'lower_body', 'core', 'cardio', 'flexibility']);
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced']);
            $table->integer('estimated_duration')->comment('Duration in minutes');
            $table->json('exercises')->comment('Array of exercise objects with sets, reps, weight');
            $table->json('equipment_needed')->nullable();
            $table->json('target_muscles')->nullable();
            $table->string('video_url')->nullable();
            $table->string('thumbnail')->nullable();
            $table->json('schedule_days')->comment('Array of days when this routine should be done');
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            // valid indexes
            $table->index(['body_region', 'difficulty']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routines');
    }
};
