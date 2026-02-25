<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\News\UpsertNewsRequest;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/news
     */
    public function index(Request $request): JsonResponse
    {
        $query = News::query();

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('category')) {
            $query->ofCategory($request->category);
        }

        if ($request->filled('is_featured')) {
            $query->where('is_featured', filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('from')) {
            $query->where('publish_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->where('publish_date', '<=', $request->to . ' 23:59:59');
        }

        $sortBy  = in_array($request->sort_by, ['title', 'category', 'location', 'is_featured', 'publish_date', 'created_at'])
                     ? $request->sort_by : 'publish_date';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $news = $query->orderBy($sortBy, $sortDir)
                      ->paginate($request->get('per_page', 15));

        return $this->paginated(NewsResource::collection($news));
    }

    /**
     * GET /api/v1/news/{news}
     */
    public function show(News $news): JsonResponse
    {
        return $this->success(new NewsResource($news));
    }

    /**
     * POST /api/v1/news
     */
    public function store(UpsertNewsRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('images/news', 'public');
        }

        unset($data['image']);

        $item = News::create($data);

        return $this->created(new NewsResource($item), 'News item created successfully.');
    }

    /**
     * PUT /api/v1/news/{news}
     */
    public function update(UpsertNewsRequest $request, News $news): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($news->image_path) {
                Storage::disk('public')->delete($news->image_path);
            }
            $data['image_path'] = $request->file('image')->store('images/news', 'public');
        }

        unset($data['image']);

        $news->update($data);

        return $this->updated(new NewsResource($news), 'News item updated successfully.');
    }

    /**
     * DELETE /api/v1/news/{news}
     */
    public function destroy(News $news): JsonResponse
    {
        if ($news->image_path) {
            Storage::disk('public')->delete($news->image_path);
        }

        $news->delete();

        return $this->deleted('News item deleted successfully.');
    }
}
