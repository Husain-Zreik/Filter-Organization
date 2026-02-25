<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Media\StoreMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use App\Services\MediaService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    use ApiResponse;

    public function __construct(private readonly MediaService $mediaService)
    {
    }

    /**
     * GET /api/v1/media
     */
    public function index(Request $request): JsonResponse
    {
        $query = Media::query();

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('mime_type')) {
            $query->ofType($request->mime_type);
        }

        if ($request->filled('from')) {
            $query->where('created_at', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->where('created_at', '<=', $request->to . ' 23:59:59');
        }

        $sortBy  = in_array($request->sort_by, ['name', 'mime_type', 'size_bytes', 'created_at'])
                     ? $request->sort_by : 'created_at';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $media = $query->orderBy($sortBy, $sortDir)
                       ->paginate($request->get('per_page', 15));

        return $this->paginated(MediaResource::collection($media));
    }

    /**
     * GET /api/v1/media/{media}
     */
    public function show(Media $media): JsonResponse
    {
        return $this->success(new MediaResource($media));
    }

    /**
     * POST /api/v1/media
     *
     * Multipart form upload. The 'file' field is the binary.
     * Optional 'name' field overrides the displayed name.
     */
    public function store(StoreMediaRequest $request): JsonResponse
    {
        $media = $this->mediaService->store(
            $request->file('file'),
            $request->input('name')
        );

        return $this->created(new MediaResource($media), 'File uploaded successfully.');
    }

    /**
     * DELETE /api/v1/media/{media}
     */
    public function destroy(Media $media): JsonResponse
    {
        $this->mediaService->delete($media);

        return $this->deleted('Media deleted successfully.');
    }
}
