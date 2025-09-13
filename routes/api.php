<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\IdeaController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// API Version 1 Routes
Route::prefix('v1')->group(function () {

  // Authentication Routes (Public)
  Route::post('register', [AuthController::class, 'register']);
  Route::post('login', [AuthController::class, 'login']);

  // Protected Authentication Routes
  Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logoutAll']);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('profile', [AuthController::class, 'updateProfile']);
    Route::put('change-password', [AuthController::class, 'changePassword']);
    Route::post('refresh-token', [AuthController::class, 'refreshToken']);
    Route::get('sessions', [AuthController::class, 'sessions']);
    Route::delete('sessions/{tokenId}', [AuthController::class, 'revokeToken']);
  });

  // Category Routes (Protected)
  Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::get('categories/{id}/projects', [CategoryController::class, 'withProjectCounts']);
  });

  // Project Routes (Protected)
  Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class);
    Route::get('projects/category/{categoryId}', [ProjectController::class, 'byCategory']);
    Route::get('projects/field/{field}', [ProjectController::class, 'byField']);
    Route::get('projects/featured', [ProjectController::class, 'featured']);
    Route::get('projects/statistics', [ProjectController::class, 'statistics']);
  });

  // Idea Routes (Protected)
  Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('ideas', IdeaController::class);
    Route::get('ideas/field/{field}', [IdeaController::class, 'byField']);
    Route::get('ideas/user/{userId}', [IdeaController::class, 'byUser']);
    Route::get('ideas/statistics', [IdeaController::class, 'statistics']);
  });

  // User Routes (Protected)
  Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::put('users/{id}/password', [UserController::class, 'updatePassword']);
    Route::get('users/{id}/profile', [UserController::class, 'profile']);
    Route::get('users/statistics', [UserController::class, 'statistics']);
  });

  // Post Routes (Protected)
  Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class);
    Route::get('posts/latest', [PostController::class, 'latest']);
    Route::get('posts/search', [PostController::class, 'search']);
    Route::get('posts/statistics', [PostController::class, 'statistics']);
  });

  // General Statistics Route (Protected)
  Route::middleware('auth:sanctum')->get('dashboard/statistics', function () {
    return response()->json([
      'success' => true,
      'data' => [
        'categories' => \App\Models\Category::count(),
        'projects' => \App\Models\Project::count(),
        'ideas' => \App\Models\Idea::count(),
        'users' => \App\Models\User::count(),
        'posts' => \App\Models\Post::count(),
        'recent_activity' => [
          'recent_projects' => \App\Models\Project::where('created_at', '>=', now()->subDays(7))->count(),
          'recent_ideas' => \App\Models\Idea::where('created_at', '>=', now()->subDays(7))->count(),
          'recent_posts' => \App\Models\Post::where('created_at', '>=', now()->subDays(7))->count(),
          'recent_users' => \App\Models\User::where('created_at', '>=', now()->subDays(7))->count(),
        ]
      ],
      'message' => 'Dashboard statistics retrieved successfully'
    ]);
  });

  // Health Check Route (Public)
  Route::get('health', function () {
    return response()->json([
      'success' => true,
      'status' => 'healthy',
      'timestamp' => now()->toISOString(),
      'version' => '1.0.0'
    ]);
  });
});

// Fallback route for API
Route::fallback(function () {
  return response()->json([
    'success' => false,
    'message' => 'API endpoint not found',
    'error' => 'The requested endpoint does not exist'
  ], 404);
});




