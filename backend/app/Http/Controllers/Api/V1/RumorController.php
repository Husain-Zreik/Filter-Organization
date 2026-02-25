<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rumor\UpsertRumorRequest;
use App\Http\Resources\RumorResource;
use App\Models\Rumor;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RumorController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/rumors
     */
    public function index(Request $request): JsonResponse
    {
        $query = Rumor::query();

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('status')) {
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

        $sortBy  = in_array($request->sort_by, ['title', 'status', 'category', 'publish_date', 'created_at'])
                     ? $request->sort_by : 'publish_date';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $rumors = $query->orderBy($sortBy, $sortDir)
                        ->paginate($request->get('per_page', 15));

        return $this->paginated(RumorResource::collection($rumors));
    }

    /**
     * GET /api/v1/rumors/{rumor}
     */
    public function show(Rumor $rumor): JsonResponse
    {
        return $this->success(new RumorResource($rumor));
    }

    /**
     * POST /api/v1/rumors
     */
    public function store(UpsertRumorRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('images/rumors', 'public');
        }

        unset($data['image']);

        $rumor = Rumor::create($data);

        return $this->created(new RumorResource($rumor), 'Rumor created successfully.');
    }

    /**
     * PUT /api/v1/rumors/{rumor}
     */
    public function update(UpsertRumorRequest $request, Rumor $rumor): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Remove old image
            if ($rumor->image_path) {
                Storage::disk('public')->delete($rumor->image_path);
            }
            $data['image_path'] = $request->file('image')->store('images/rumors', 'public');
        }

        unset($data['image']);

        $rumor->update($data);

        return $this->updated(new RumorResource($rumor), 'Rumor updated successfully.');
    }

    /**
     * DELETE /api/v1/rumors/{rumor}
     */
    public function destroy(Rumor $rumor): JsonResponse
    {
        if ($rumor->image_path) {
            Storage::disk('public')->delete($rumor->image_path);
        }

        $rumor->delete();

        return $this->deleted('Rumor deleted successfully.');
    }
}
