<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class IdeaController extends Controller
{
  /**
   * Display a listing of ideas.
   */
  public function index(Request $request): JsonResponse
  {
    try {
      $query = Idea::with(['user']);

      // Apply search filter if provided
      if ($request->has('search')) {
        $query->where(function ($q) use ($request) {
          $q->where('name', 'like', '%' . $request->search . '%')
            ->orWhere('description', 'like', '%' . $request->search . '%')
            ->orWhere('field', 'like', '%' . $request->search . '%');
        });
      }

      // Filter by field
      if ($request->has('field')) {
        $query->where('field', $request->field);
      }

      // Filter by capacity range
      if ($request->has('min_capacity')) {
        $query->where('capacity', '>=', $request->min_capacity);
      }
      if ($request->has('max_capacity')) {
        $query->where('capacity', '<=', $request->max_capacity);
      }

      // Filter by cost range
      if ($request->has('min_cost')) {
        $query->where('cost', '>=', $request->min_cost);
      }
      if ($request->has('max_cost')) {
        $query->where('cost', '<=', $request->max_cost);
      }

      // Filter by user
      if ($request->has('user_id')) {
        $query->where('user_id', $request->user_id);
      }

      // Apply sorting
      $sortBy = $request->get('sort_by', 'created_at');
      $sortOrder = $request->get('sort_order', 'desc');
      $query->orderBy($sortBy, $sortOrder);

      // Pagination
      $perPage = $request->get('per_page', 15);
      $ideas = $query->paginate($perPage);

      return response()->json([
        'success' => true,
        'data' => $ideas,
        'message' => 'Ideas retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve ideas',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created idea.
   */
  public function store(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'field' => 'nullable|string|max:255',
        'capacity' => 'nullable|integer|min:1',
        'cost' => 'nullable|numeric|min:0',
        'description' => 'nullable|string',
        'user_id' => 'required|exists:users,id',
      ]);

      $idea = Idea::create($validated);
      $idea->load('user');

      return response()->json([
        'success' => true,
        'data' => $idea,
        'message' => 'Idea created successfully'
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
        'message' => 'Failed to create idea',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified idea.
   */
  public function show(string $id): JsonResponse
  {
    try {
      $idea = Idea::with(['user'])->findOrFail($id);

      return response()->json([
        'success' => true,
        'data' => $idea,
        'message' => 'Idea retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Idea not found',
        'error' => $e->getMessage()
      ], 404);
    }
  }

  /**
   * Update the specified idea.
   */
  public function update(Request $request, string $id): JsonResponse
  {
    try {
      $idea = Idea::findOrFail($id);

      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'field' => 'nullable|string|max:255',
        'capacity' => 'nullable|integer|min:1',
        'cost' => 'nullable|numeric|min:0',
        'description' => 'nullable|string',
        'user_id' => 'required|exists:users,id',
      ]);

      $idea->update($validated);
      $idea->load('user');

      return response()->json([
        'success' => true,
        'data' => $idea,
        'message' => 'Idea updated successfully'
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
        'message' => 'Failed to update idea',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified idea.
   */
  public function destroy(string $id): JsonResponse
  {
    try {
      $idea = Idea::findOrFail($id);
      $idea->delete();

      return response()->json([
        'success' => true,
        'message' => 'Idea deleted successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to delete idea',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get ideas by field.
   */
  public function byField(string $field): JsonResponse
  {
    try {
      $ideas = Idea::with(['user'])
        ->where('field', $field)
        ->orderBy('created_at', 'desc')
        ->get();

      return response()->json([
        'success' => true,
        'data' => $ideas,
        'message' => "Ideas in {$field} field retrieved successfully"
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve ideas',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get ideas by user.
   */
  public function byUser(string $userId): JsonResponse
  {
    try {
      $user = User::findOrFail($userId);
      $ideas = $user->ideas()->orderBy('created_at', 'desc')->get();

      return response()->json([
        'success' => true,
        'data' => $ideas,
        'message' => "Ideas by {$user->name} retrieved successfully"
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve user ideas',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get ideas statistics.
   */
  public function statistics(): JsonResponse
  {
    try {
      $stats = [
        'total_ideas' => Idea::count(),
        'average_cost' => Idea::avg('cost'),
        'average_capacity' => Idea::avg('capacity'),
        'ideas_by_field' => Idea::selectRaw('field, COUNT(*) as count')
          ->whereNotNull('field')
          ->groupBy('field')
          ->get(),
        'cost_range' => [
          'min' => Idea::min('cost'),
          'max' => Idea::max('cost')
        ],
        'capacity_range' => [
          'min' => Idea::min('capacity'),
          'max' => Idea::max('capacity')
        ]
      ];

      return response()->json([
        'success' => true,
        'data' => $stats,
        'message' => 'Ideas statistics retrieved successfully'
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