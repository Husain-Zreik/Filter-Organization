<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Page\UpsertPageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/pages
     *
     * Unauthenticated callers only see published pages.
     * Authenticated admin can filter by any status.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Page::with('featuredMedia');

        // Public access: only published content
        if (!$request->user()) {
            $query->published();
        }

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('status') && $request->user()) {
            $query->ofStatus($request->status);
        }

        if ($request->filled('category')) {
            $query->ofCategory($request->category);
        }

        if ($request->filled('from')) {
            $query->where('publish_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->where('publish_date', '<=', $request->to . ' 23:59:59');
        }

        $sortBy  = in_array($request->sort_by, ['title_en', 'title_ar', 'slug', 'status', 'category', 'publish_date', 'updated_at'])
                     ? $request->sort_by : 'updated_at';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $pages = $query->orderBy($sortBy, $sortDir)
                       ->paginate($request->get('per_page', 15));

        return $this->paginated(PageResource::collection($pages));
    }

    /**
     * GET /api/v1/pages/{page}
     *
     * Public can only resolve published pages. Authenticated admin sees all.
     */
    public function show(Request $request, Page $page): JsonResponse
    {
        if (!$request->user() && $page->status !== 'published') {
            return response()->json(['success' => false, 'message' => 'Resource not found.'], 404);
        }

        $page->load('featuredMedia');

        return $this->success(new PageResource($page));
    }

    /**
     * POST /api/v1/pages
     */
    public function store(UpsertPageRequest $request): JsonResponse
    {
        $page = Page::create($request->validated());
        $page->load('featuredMedia');

        return $this->created(new PageResource($page), 'Page created successfully.');
    }

    /**
     * PUT /api/v1/pages/{page}
     */
    public function update(UpsertPageRequest $request, Page $page): JsonResponse
    {
        $page->update($request->validated());
        $page->load('featuredMedia');

        return $this->updated(new PageResource($page), 'Page updated successfully.');
    }

    /**
     * DELETE /api/v1/pages/{page}
     */
    public function destroy(Page $page): JsonResponse
    {
        $page->delete();

        return $this->deleted('Page deleted successfully.');
    }
}
