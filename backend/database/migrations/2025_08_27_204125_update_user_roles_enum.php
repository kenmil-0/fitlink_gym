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
            // Drop the old enum column
            $table->dropColumn('role');
        });

        Schema::table('users', function (Blueprint $table) {
            // Add the new enum column with correct values
            $table->enum('role', ['member', 'trainer', 'gym_owner', 'admin'])->default('member')->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['user', 'gym_owner', 'admin'])->default('user')->after('email');
        });
    }
};
