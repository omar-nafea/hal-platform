<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  /**
   * Register a new user
   */
  public function register(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'phone' => 'nullable|string|max:20',
      ]);

      $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'phone' => $validated['phone'] ?? null,
      ]);

      // Create token
      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'success' => true,
        'data' => [
          'user' => $user->makeHidden(['password', 'remember_token']),
          'token' => $token,
          'token_type' => 'Bearer'
        ],
        'message' => 'User registered successfully'
      ], 201);

    } catch (ValidationException $e) {
      return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $e->errors()
      ], 422);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Registration failed',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Login user
   */
  public function login(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
      ]);

      $user = User::where('email', $validated['email'])->first();

      if (!$user || !Hash::check($validated['password'], $user->password)) {
        return response()->json([
          'success' => false,
          'message' => 'Invalid credentials'
        ], 401);
      }

      // Delete old tokens (optional - for single session)
      // $user->tokens()->delete();

      // Create token
      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'success' => true,
        'data' => [
          'user' => $user->makeHidden(['password', 'remember_token']),
          'token' => $token,
          'token_type' => 'Bearer'
        ],
        'message' => 'Login successful'
      ]);

    } catch (ValidationException $e) {
      return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $e->errors()
      ], 422);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Login failed',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Logout user (delete current token)
   */
  public function logout(Request $request): JsonResponse
  {
    try {
      // Delete current token
      $request->user()->currentAccessToken()->delete();

      return response()->json([
        'success' => true,
        'message' => 'Logout successful'
      ]);

    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Logout failed',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Logout from all devices (delete all tokens)
   */
  public function logoutAll(Request $request): JsonResponse
  {
    try {
      // Delete all tokens
      $request->user()->tokens()->delete();

      return response()->json([
        'success' => true,
        'message' => 'Logged out from all devices successfully'
      ]);

    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Logout failed',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get authenticated user profile
   */
  public function profile(Request $request): JsonResponse
  {
    try {
      $user = $request->user()->load(['ideas']);
      $user->makeHidden(['password', 'remember_token']);

      $profile = [
        'user' => $user,
        'statistics' => [
          'total_ideas' => $user->ideas()->count(),
          'recent_ideas' => $user->ideas()->where('created_at', '>=', now()->subDays(30))->count(),
          'ideas_by_field' => $user->ideas()
            ->selectRaw('field, COUNT(*) as count')
            ->whereNotNull('field')
            ->groupBy('field')
            ->get(),
        ]
      ];

      return response()->json([
        'success' => true,
        'data' => $profile,
        'message' => 'Profile retrieved successfully'
      ]);

    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve profile',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Update user profile
   */
  public function updateProfile(Request $request): JsonResponse
  {
    try {
      $user = $request->user();

      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        'phone' => 'nullable|string|max:20',
      ]);

      $user->update($validated);
      $user->makeHidden(['password', 'remember_token']);

      return response()->json([
        'success' => true,
        'data' => $user,
        'message' => 'Profile updated successfully'
      ]);

    } catch (ValidationException $e) {
      return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $e->errors()
      ], 422);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to update profile',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Change password
   */
  public function changePassword(Request $request): JsonResponse
  {
    try {
      $user = $request->user();

      $validated = $request->validate([
        'current_password' => 'required|string',
        'new_password' => 'required|string|min:8|confirmed',
      ]);

      if (!Hash::check($validated['current_password'], $user->password)) {
        return response()->json([
          'success' => false,
          'message' => 'Current password is incorrect'
        ], 422);
      }

      $user->update([
        'password' => Hash::make($validated['new_password'])
      ]);

      // Optionally, logout from all devices after password change
      $user->tokens()->delete();

      return response()->json([
        'success' => true,
        'message' => 'Password changed successfully. Please login again.'
      ]);

    } catch (ValidationException $e) {
      return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $e->errors()
      ], 422);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to change password',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Refresh token (get new token)
   */
  public function refreshToken(Request $request): JsonResponse
  {
    try {
      $user = $request->user();

      // Delete current token
      $request->user()->currentAccessToken()->delete();

      // Create new token
      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'success' => true,
        'data' => [
          'user' => $user->makeHidden(['password', 'remember_token']),
          'token' => $token,
          'token_type' => 'Bearer'
        ],
        'message' => 'Token refreshed successfully'
      ]);

    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to refresh token',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get user's active sessions (tokens)
   */
  public function sessions(Request $request): JsonResponse
  {
    try {
      $user = $request->user();
      $tokens = $user->tokens()->get()->map(function ($token) {
        return [
          'id' => $token->id,
          'name' => $token->name,
          'abilities' => $token->abilities,
          'last_used_at' => $token->last_used_at,
          'expires_at' => $token->expires_at,
          'created_at' => $token->created_at,
        ];
      });

      return response()->json([
        'success' => true,
        'data' => $tokens,
        'message' => 'Active sessions retrieved successfully'
      ]);

    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve sessions',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Revoke specific token
   */
  public function revokeToken(Request $request, $tokenId): JsonResponse
  {
    try {
      $user = $request->user();
      $token = $user->tokens()->find($tokenId);

      if (!$token) {
        return response()->json([
          'success' => false,
          'message' => 'Token not found'
        ], 404);
      }

      $token->delete();

      return response()->json([
        'success' => true,
        'message' => 'Token revoked successfully'
      ]);

    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to revoke token',
        'error' => $e->getMessage()
      ], 500);
    }
  }
}