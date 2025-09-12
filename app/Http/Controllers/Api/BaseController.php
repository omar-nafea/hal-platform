<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
  /**
   * Success response method.
   */
  public function sendResponse($result, $message = 'Success', $code = 200): JsonResponse
  {
    $response = [
      'success' => true,
      'data' => $result,
      'message' => $message,
    ];

    return response()->json($response, $code);
  }

  /**
   * Error response method.
   */
  public function sendError($error, $errorMessages = [], $code = 404): JsonResponse
  {
    $response = [
      'success' => false,
      'message' => $error,
    ];

    if (!empty($errorMessages)) {
      $response['errors'] = $errorMessages;
    }

    return response()->json($response, $code);
  }

  /**
   * Validation error response method.
   */
  public function sendValidationError($errorMessages, $message = 'Validation failed'): JsonResponse
  {
    return $this->sendError($message, $errorMessages, 422);
  }

  /**
   * Paginated response method.
   */
  public function sendPaginatedResponse($data, $message = 'Data retrieved successfully'): JsonResponse
  {
    return response()->json([
      'success' => true,
      'data' => $data->items(),
      'pagination' => [
        'current_page' => $data->currentPage(),
        'per_page' => $data->perPage(),
        'total' => $data->total(),
        'last_page' => $data->lastPage(),
        'from' => $data->firstItem(),
        'to' => $data->lastItem(),
        'has_more_pages' => $data->hasMorePages(),
      ],
      'message' => $message,
    ]);
  }

  /**
   * Collection response method.
   */
  public function sendCollectionResponse($collection, $message = 'Collection retrieved successfully'): JsonResponse
  {
    return response()->json([
      'success' => true,
      'data' => $collection,
      'count' => $collection->count(),
      'message' => $message,
    ]);
  }

  /**
   * Statistics response method.
   */
  public function sendStatisticsResponse($statistics, $message = 'Statistics retrieved successfully'): JsonResponse
  {
    return response()->json([
      'success' => true,
      'data' => $statistics,
      'generated_at' => now()->toISOString(),
      'message' => $message,
    ]);
  }
}