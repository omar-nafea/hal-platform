<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
  /**
   * Display a listing of categories.
   */
  public function index(Request $request): JsonResponse
  {
    try {
      $query = Category::query();

      // Apply search filter if provided
      if ($request->has('search')) {
        $query->where('title', 'like', '%' . $request->search . '%');
      }

      // Apply sorting
      $sortBy = $request->get('sort_by', 'created_at');
      $sortOrder = $request->get('sort_order', 'desc');
      $query->orderBy($sortBy, $sortOrder);

      // Pagination
      $perPage = $request->get('per_page', 15);
      $categories = $query->paginate($perPage);

      return response()->json([
        'success' => true,
        'data' => $categories,
        'message' => 'Categories retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve categories',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created category.
   */
  public function store(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'title' => 'required|string|max:255|unique:categories,title',
      ]);

      $category = Category::create($validated);

      return response()->json([
        'success' => true,
        'data' => $category,
        'message' => 'Category created successfully'
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
        'message' => 'Failed to create category',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified category.
   */
  public function show(string $id): JsonResponse
  {
    try {
      $category = Category::with('projects')->findOrFail($id);

      return response()->json([
        'success' => true,
        'data' => $category,
        'message' => 'Category retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Category not found',
        'error' => $e->getMessage()
      ], 404);
    }
  }

  /**
   * Update the specified category.
   */
  public function update(Request $request, string $id): JsonResponse
  {
    try {
      $category = Category::findOrFail($id);

      $validated = $request->validate([
        'title' => 'required|string|max:255|unique:categories,title,' . $id,
      ]);

      $category->update($validated);

      return response()->json([
        'success' => true,
        'data' => $category,
        'message' => 'Category updated successfully'
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
        'message' => 'Failed to update category',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified category.
   */
  public function destroy(string $id): JsonResponse
  {
    try {
      $category = Category::findOrFail($id);

      // Check if category has projects
      if ($category->projects()->count() > 0) {
        return response()->json([
          'success' => false,
          'message' => 'Cannot delete category with associated projects'
        ], 409);
      }

      $category->delete();

      return response()->json([
        'success' => true,
        'message' => 'Category deleted successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to delete category',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get categories with project counts.
   */
  public function withProjectCounts(): JsonResponse
  {
    try {
      $categories = Category::withCount('projects')->get();

      return response()->json([
        'success' => true,
        'data' => $categories,
        'message' => 'Categories with project counts retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve categories',
        'error' => $e->getMessage()
      ], 500);
    }
  }
}