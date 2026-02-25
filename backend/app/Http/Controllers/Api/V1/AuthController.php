<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * POST /api/v1/auth/login
     *
     * Returns a Sanctum API token on valid credentials.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user  = Auth::user();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'data'    => [
                'token' => $token,
                'user'  => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ],
            ],
        ]);
    }

    /**
     * POST /api/v1/auth/logout
     *
     * Revokes the current token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->deleted('Logged out successfully.');
    }

    /**
     * GET /api/v1/auth/me
     *
     * Returns the authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return $this->success([
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
        ]);
    }
}
