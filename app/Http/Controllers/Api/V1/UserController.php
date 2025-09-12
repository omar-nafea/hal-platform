<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  /**
   * Display a listing of users.
   */
  public function index(Request $request): JsonResponse
  {
    try {
      $query = User::query();

      // Apply search filter if provided
      if ($request->has('search')) {
        $query->where(function ($q) use ($request) {
          $q->where('name', 'like', '%' . $request->search . '%')
            ->orWhere('email', 'like', '%' . $request->search . '%');
        });
      }

      // Filter by email verification status
      if ($request->has('verified')) {
        if ($request->verified === 'true') {
          $query->whereNotNull('email_verified_at');
        } else {
          $query->whereNull('email_verified_at');
        }
      }

      // Apply sorting
      $sortBy = $request->get('sort_by', 'created_at');
      $sortOrder = $request->get('sort_order', 'desc');
      $query->orderBy($sortBy, $sortOrder);

      // Pagination
      $perPage = $request->get('per_page', 15);
      $users = $query->paginate($perPage);

      // Hide sensitive information
      $users->getCollection()->transform(function ($user) {
        $user->makeHidden(['password', 'remember_token']);
        return $user;
      });

      return response()->json([
        'success' => true,
        'data' => $users,
        'message' => 'Users retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve users',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created user.
   */
  public function store(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'phone' => 'nullable|string|max:20',
      ]);

      $validated['password'] = Hash::make($validated['password']);

      $user = User::create($validated);
      $user->makeHidden(['password', 'remember_token']);

      return response()->json([
        'success' => true,
        'data' => $user,
        'message' => 'User created successfully'
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
        'message' => 'Failed to create user',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified user.
   */
  public function show(string $id): JsonResponse
  {
    try {
      $user = User::with(['ideas'])->findOrFail($id);
      $user->makeHidden(['password', 'remember_token']);

      return response()->json([
        'success' => true,
        'data' => $user,
        'message' => 'User retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'User not found',
        'error' => $e->getMessage()
      ], 404);
    }
  }

  /**
   * Update the specified user.
   */
  public function update(Request $request, string $id): JsonResponse
  {
    try {
      $user = User::findOrFail($id);

      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        'phone' => 'nullable|string|max:20',
      ]);

      $user->update($validated);
      $user->makeHidden(['password', 'remember_token']);

      return response()->json([
        'success' => true,
        'data' => $user,
        'message' => 'User updated successfully'
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
        'message' => 'Failed to update user',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified user.
   */
  public function destroy(string $id): JsonResponse
  {
    try {
      $user = User::findOrFail($id);

      // Check if user has ideas
      if ($user->ideas()->count() > 0) {
        return response()->json([
          'success' => false,
          'message' => 'Cannot delete user with associated ideas'
        ], 409);
      }

      $user->delete();

      return response()->json([
        'success' => true,
        'message' => 'User deleted successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to delete user',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Update user password.
   */
  public function updatePassword(Request $request, string $id): JsonResponse
  {
    try {
      $user = User::findOrFail($id);

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

      return response()->json([
        'success' => true,
        'message' => 'Password updated successfully'
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
        'message' => 'Failed to update password',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get user profile with statistics.
   */
  public function profile(string $id): JsonResponse
  {
    try {
      $user = User::with(['ideas'])->findOrFail($id);
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
        'message' => 'User profile retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve user profile',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get users statistics.
   */
  public function statistics(): JsonResponse
  {
    try {
      $stats = [
        'total_users' => User::count(),
        'verified_users' => User::whereNotNull('email_verified_at')->count(),
        'unverified_users' => User::whereNull('email_verified_at')->count(),
        'recent_registrations' => User::where('created_at', '>=', now()->subDays(30))->count(),
        'users_with_ideas' => User::has('ideas')->count(),
      ];

      return response()->json([
        'success' => true,
        'data' => $stats,
        'message' => 'Users statistics retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve statistics',
        'error' => $e->getMessage()
      ], 500);
    }
  }
}