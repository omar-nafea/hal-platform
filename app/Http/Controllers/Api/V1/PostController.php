<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
  /**
   * Display a listing of posts.
   */
  public function index(Request $request): JsonResponse
  {
    try {
      $query = Post::query();

      // Apply search filter if provided
      if ($request->has('search')) {
        $query->where(function ($q) use ($request) {
          $q->where('title', 'like', '%' . $request->search . '%')
            ->orWhere('body', 'like', '%' . $request->search . '%');
        });
      }

      // Apply sorting
      $sortBy = $request->get('sort_by', 'created_at');
      $sortOrder = $request->get('sort_order', 'desc');
      $query->orderBy($sortBy, $sortOrder);

      // Pagination
      $perPage = $request->get('per_page', 15);
      $posts = $query->paginate($perPage);

      return response()->json([
        'success' => true,
        'data' => $posts,
        'message' => 'Posts retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve posts',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created post.
   */
  public function store(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'title' => 'required|string|max:255',
        'body' => 'required|string',
      ]);

      $post = Post::create($validated);

      return response()->json([
        'success' => true,
        'data' => $post,
        'message' => 'Post created successfully'
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
        'message' => 'Failed to create post',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified post.
   */
  public function show(string $id): JsonResponse
  {
    try {
      $post = Post::findOrFail($id);

      return response()->json([
        'success' => true,
        'data' => $post,
        'message' => 'Post retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Post not found',
        'error' => $e->getMessage()
      ], 404);
    }
  }

  /**
   * Update the specified post.
   */
  public function update(Request $request, string $id): JsonResponse
  {
    try {
      $post = Post::findOrFail($id);

      $validated = $request->validate([
        'title' => 'required|string|max:255',
        'body' => 'required|string',
      ]);

      $post->update($validated);

      return response()->json([
        'success' => true,
        'data' => $post,
        'message' => 'Post updated successfully'
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
        'message' => 'Failed to update post',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified post.
   */
  public function destroy(string $id): JsonResponse
  {
    try {
      $post = Post::findOrFail($id);
      $post->delete();

      return response()->json([
        'success' => true,
        'message' => 'Post deleted successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to delete post',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get latest posts.
   */
  public function latest(Request $request): JsonResponse
  {
    try {
      $limit = $request->get('limit', 10);
      $posts = Post::orderBy('created_at', 'desc')
        ->limit($limit)
        ->get();

      return response()->json([
        'success' => true,
        'data' => $posts,
        'message' => 'Latest posts retrieved successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to retrieve latest posts',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Search posts by title and body.
   */
  public function search(Request $request): JsonResponse
  {
    try {
      $validated = $request->validate([
        'query' => 'required|string|min:3',
      ]);

      $posts = Post::where('title', 'like', '%' . $validated['query'] . '%')
        ->orWhere('body', 'like', '%' . $validated['query'] . '%')
        ->orderBy('created_at', 'desc')
        ->paginate(15);

      return response()->json([
        'success' => true,
        'data' => $posts,
        'message' => 'Search results retrieved successfully'
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
        'message' => 'Failed to search posts',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Get posts statistics.
   */
  public function statistics(): JsonResponse
  {
    try {
      $stats = [
        'total_posts' => Post::count(),
        'recent_posts' => Post::where('created_at', '>=', now()->subDays(30))->count(),
        'average_title_length' => Post::selectRaw('AVG(LENGTH(title)) as avg_length')->first()->avg_length,
        'average_body_length' => Post::selectRaw('AVG(LENGTH(body)) as avg_length')->first()->avg_length,
      ];

      return response()->json([
        'success' => true,
        'data' => $stats,
        'message' => 'Posts statistics retrieved successfully'
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