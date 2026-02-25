<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\UpsertPostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/posts
     *
     * Unauthenticated callers only see published posts.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Post::with('featuredMedia');

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
                     ? $request->sort_by : 'publish_date';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $posts = $query->orderBy($sortBy, $sortDir)
                       ->paginate($request->get('per_page', 15));

        return $this->paginated(PostResource::collection($posts));
    }

    /**
     * GET /api/v1/posts/{post}
     */
    public function show(Request $request, Post $post): JsonResponse
    {
        if (!$request->user() && $post->status !== 'published') {
            return response()->json(['success' => false, 'message' => 'Resource not found.'], 404);
        }

        $post->load('featuredMedia');

        return $this->success(new PostResource($post));
    }

    /**
     * POST /api/v1/posts
     */
    public function store(UpsertPostRequest $request): JsonResponse
    {
        $post = Post::create($request->validated());
        $post->load('featuredMedia');

        return $this->created(new PostResource($post), 'Post created successfully.');
    }

    /**
     * PUT /api/v1/posts/{post}
     */
    public function update(UpsertPostRequest $request, Post $post): JsonResponse
    {
        $post->update($request->validated());
        $post->load('featuredMedia');

        return $this->updated(new PostResource($post), 'Post updated successfully.');
    }

    /**
     * DELETE /api/v1/posts/{post}
     */
    public function destroy(Post $post): JsonResponse
    {
        $post->delete();

        return $this->deleted('Post deleted successfully.');
    }
}
