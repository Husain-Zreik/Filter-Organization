<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\UpsertSettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/settings
     *
     * Public: returns only active settings (cached).
     * Admin: returns all settings with filtering.
     */
    public function index(Request $request): JsonResponse
    {
        // Public request — return cached active settings
        if (!$request->user()) {
            return $this->success(
                SettingResource::collection(Setting::getCached())->toArray($request)
            );
        }

        // Admin request — full query with filters
        $query = Setting::query();

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('section')) {
            $query->ofSection($request->section);
        }

        if ($request->filled('status')) {
            $query->ofStatus($request->status);
        }

        $settings = $query->orderBy('section')->orderBy('key')
                          ->paginate($request->get('per_page', 50));

        return $this->paginated(SettingResource::collection($settings));
    }

    /**
     * GET /api/v1/settings/{setting}
     */
    public function show(Setting $setting): JsonResponse
    {
        return $this->success(new SettingResource($setting));
    }

    /**
     * POST /api/v1/settings
     */
    public function store(UpsertSettingRequest $request): JsonResponse
    {
        $setting = Setting::create($request->validated());

        return $this->created(new SettingResource($setting), 'Setting created successfully.');
    }

    /**
     * PUT /api/v1/settings/{setting}
     */
    public function update(UpsertSettingRequest $request, Setting $setting): JsonResponse
    {
        $setting->update($request->validated());

        return $this->updated(new SettingResource($setting), 'Setting updated successfully.');
    }

    /**
     * DELETE /api/v1/settings/{setting}
     */
    public function destroy(Setting $setting): JsonResponse
    {
        $setting->delete();

        return $this->deleted('Setting deleted successfully.');
    }
}
