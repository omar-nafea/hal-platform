<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
  /**
   * Display a listing of projects.
   */
  public function index(Request $request): JsonResponse
  {
    try {
      $query = Project::with(['category']);

      // Apply search filter if provided
      if ($request->has('search')) {
        $query->where(function ($q) use ($request) {
          $q->where('title', 'like', '%' . $request->search . '%')
            ->orWhere('description', 'like', '%' . $request->search . '%')
            ->orWhere('field', 'like', '%' . $request->search . '%');
        });
      }

      // Filter by category
      if ($request->has('category_id')) {
        $query->where('category_id', $request->category_id);
      }

      // Filter by field
      if ($request->has('field')) {
        $query->where('field', $request->field);
      }

      // Apply sorting
      $sortBy = $request->get('sort_by', 'created_at');
      $sortOrder = $request->get('sort_order', 'desc');
      $query->orderBy($sortBy, $sortOrder);

      // Pagination
      $perPage = $request->get('per_page', 15);
      $projects = $query->paginate($perPage);

      return response()->json([
        'success' => true,
        'data' => $projects,
        'message' => 'Projects retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve projects',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created project.
   */
  public function store(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'field' => 'nullable|string|max:255',
        'category_id' => 'required|exists:categories,id',
      ]);

      $project = Project::create($validated);
      $project->load('category');

      return response()->json([
        'success' => true,
        'data' => $project,
        'message' => 'Project created successfully'
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
        'message' => 'Failed to create project',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified project.
   */
  public function show(string $id): JsonResponse
  {
    try {
      $project = Project::with(['category'])->findOrFail($id);

      return response()->json([
        'success' => true,
        'data' => $project,
        'message' => 'Project retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Project not found',
        'error' => $e->getMessage()
      ], 404);
    }
  }

  /**
   * Update the specified project.
   */
  public function update(Request $request, string $id): JsonResponse
  {
    try {
      $project = Project::findOrFail($id);

      $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'field' => 'nullable|string|max:255',
        'category_id' => 'required|exists:categories,id',
      ]);

      $project->update($validated);
      $project->load('category');

      return response()->json([
        'success' => true,
        'data' => $project,
        'message' => 'Project updated successfully'
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
        'message' => 'Failed to update project',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified project.
   */
  public function destroy(string $id): JsonResponse
  {
    try {
      $project = Project::findOrFail($id);
      $project->delete();

      return response()->json([
        'success' => true,
        'message' => 'Project deleted successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to delete project',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get projects by category.
   */
  public function byCategory(string $categoryId): JsonResponse
  {
    try {
      $category = Category::findOrFail($categoryId);
      $projects = $category->projects()->orderBy('created_at', 'desc')->get();

      return response()->json([
        'success' => true,
        'data' => $projects,
        'message' => "Projects in {$category->title} category retrieved successfully"
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve category projects',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get projects by field.
   */
  public function byField(string $field): JsonResponse
  {
    try {
      $projects = Project::with(['category'])
        ->where('field', $field)
        ->orderBy('created_at', 'desc')
        ->get();

      return response()->json([
        'success' => true,
        'data' => $projects,
        'message' => "Projects in {$field} field retrieved successfully"
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve projects',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get featured/latest projects.
   */
  public function featured(Request $request): JsonResponse
  {
    try {
      $limit = $request->get('limit', 10);
      $projects = Project::with(['category'])
        ->orderBy('created_at', 'desc')
        ->limit($limit)
        ->get();

      return response()->json([
        'success' => true,
        'data' => $projects,
        'message' => 'Featured projects retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve featured projects',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get projects statistics.
   */
  public function statistics(): JsonResponse
  {
    try {
      $stats = [
        'total_projects' => Project::count(),
        'projects_by_category' => Project::with('category')
          ->selectRaw('category_id, COUNT(*) as count')
          ->groupBy('category_id')
          ->get()
          ->map(function ($item) {
            return [
              'category' => $item->category->title ?? 'Unknown',
              'count' => $item->count
            ];
          }),
        'projects_by_field' => Project::selectRaw('field, COUNT(*) as count')
          ->whereNotNull('field')
          ->groupBy('field')
          ->get(),
        'recent_projects_count' => Project::where('created_at', '>=', now()->subDays(30))->count()
      ];

      return response()->json([
        'success' => true,
        'data' => $stats,
        'message' => 'Projects statistics retrieved successfully'
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