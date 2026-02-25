<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

trait ApiResponse
{
    /**
     * 200 success with optional data payload.
     */
    protected function success(mixed $data = null, string $message = '', int $status = 200): JsonResponse
    {
        $payload = ['success' => true];

        if ($message !== '') {
            $payload['message'] = $message;
        }

        if ($data !== null) {
            $payload['data'] = $data instanceof JsonResource
                ? $data->toArray(request())
                : $data;
        }

        return response()->json($payload, $status);
    }

    /**
     * 201 created — wraps a single resource.
     */
    protected function created(JsonResource $resource, string $message = 'Created successfully.'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $resource->toArray(request()),
        ], 201);
    }

    /**
     * 200 updated — wraps a single resource.
     */
    protected function updated(JsonResource $resource, string $message = 'Updated successfully.'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $resource->toArray(request()),
        ]);
    }

    /**
     * 200 deleted.
     */
    protected function deleted(string $message = 'Deleted successfully.'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
        ]);
    }

    /**
     * Paginated collection response — keeps Laravel's default pagination meta.
     */
    protected function paginated(ResourceCollection $collection): JsonResponse
    {
        return $collection->additional(['success' => true])->response();
    }
}
