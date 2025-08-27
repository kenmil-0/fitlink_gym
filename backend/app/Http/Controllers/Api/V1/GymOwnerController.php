<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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
            ],
            [
                'id' => 3,
                'name' => 'David Wilson',
                'plan' => 'Premium',
                'status' => 'active',
                'join_date' => '2024-01-20',
                'email' => 'david@example.com'
            ],
            [
                'id' => 4,
                'name' => 'Maria Garcia',
                'plan' => 'Basic',
                'status' => 'inactive',
                'join_date' => '2024-02-10',
                'email' => 'maria@example.com'
            ]
        ]);
    }

    public function getRevenue(Request $request)
    {
        // Mock data - replace with actual database queries
        return response()->json([
            ['month' => 'Jan', 'amount' => 12500],
            ['month' => 'Feb', 'amount' => 13800],
            ['month' => 'Mar', 'amount' => 14200],
            ['month' => 'Apr', 'amount' => 15600],
            ['month' => 'May', 'amount' => 14900],
            ['month' => 'Jun', 'amount' => 16200]
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
                'amount' => 99.99,
                'next_billing' => '2024-09-15'
            ],
            [
                'id' => 2,
                'member_name' => 'Lisa Brown',
                'plan' => 'Basic',
                'status' => 'active',
                'amount' => 49.99,
                'next_billing' => '2024-09-01'
            ],
            [
                'id' => 3,
                'member_name' => 'David Wilson',
                'plan' => 'Premium',
                'status' => 'active',
                'amount' => 99.99,
                'next_billing' => '2024-09-20'
            ]
        ]);
    }
}
