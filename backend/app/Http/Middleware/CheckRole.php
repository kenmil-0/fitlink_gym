<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }
        
        // Check if user has the required role
        if (!$this->hasRole($user, $role)) {
            return response()->json([
                'message' => 'Access denied. Insufficient permissions.',
                'required_role' => $role,
                'user_role' => $user->role
            ], 403);
        }
        
        return $next($request);
    }
    
    /**
     * Check if user has the specified role.
     */
    private function hasRole($user, string $role): bool
    {
        // Admin has access to everything
        if ($user->role === 'admin') {
            return true;
        }
        
        // Check specific role
        switch ($role) {
            case 'gym_owner':
                return $user->role === 'gym_owner';
            case 'instructor':
                return $user->role === 'instructor';
            case 'user':
                return $user->role === 'user';
            default:
                return false;
        }
    }
}
