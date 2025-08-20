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
        Schema::create('gym_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('business_name');
            $table->text('business_description');
            $table->string('business_address');
            $table->string('business_city')->default('Asaba');
            $table->string('business_state')->default('Delta');
            $table->string('business_country')->default('Nigeria');
            $table->decimal('business_latitude', 10, 8)->nullable();
            $table->decimal('business_longitude', 11, 8)->nullable();
            $table->string('business_phone');
            $table->string('business_email')->nullable();
            $table->string('business_website')->nullable();
            $table->json('business_documents')->nullable()->comment('Array of document URLs');
            $table->json('business_licenses')->nullable()->comment('Array of license information');
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected', 'requires_changes'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index(['business_city', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gym_applications');
    }
};
