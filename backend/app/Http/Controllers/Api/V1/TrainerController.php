<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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
            ],
            [
                'id' => 3,
                'name' => 'Emma Wilson',
                'progress' => 90,
                'last_workout' => '3 days ago',
                'email' => 'emma@example.com'
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
            ],
            [
                'id' => 3,
                'name' => 'Weight Loss Program',
                'client_count' => 12,
                'duration' => '8 weeks',
                'difficulty' => 'Intermediate'
            ]
        ]);
    }

    public function createRoutine(Request $request)
    {
        // Validate request
        $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'required|string',
            'difficulty' => 'required|string|in:Beginner,Intermediate,Advanced',
            'description' => 'nullable|string'
        ]);

        // Mock routine creation - replace with actual database insertion
        $routine = [
            'id' => rand(100, 999),
            'name' => $request->name,
            'duration' => $request->duration,
            'difficulty' => $request->difficulty,
            'description' => $request->description,
            'client_count' => 0,
            'created_at' => now()
        ];

        return response()->json([
            'message' => 'Routine created successfully',
            'routine' => $routine
        ], 201);
    }
}
