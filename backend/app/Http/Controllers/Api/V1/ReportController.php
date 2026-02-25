<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\UpsertReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/reports
     */
    public function index(Request $request): JsonResponse
    {
        $query = Report::query();

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

        $sortBy  = in_array($request->sort_by, ['title', 'category', 'file_pages', 'is_featured', 'publish_date', 'created_at'])
                     ? $request->sort_by : 'publish_date';
        $sortDir = $request->sort_dir === 'asc' ? 'asc' : 'desc';

        $reports = $query->orderBy($sortBy, $sortDir)
                         ->paginate($request->get('per_page', 15));

        return $this->paginated(ReportResource::collection($reports));
    }

    /**
     * GET /api/v1/reports/{report}
     */
    public function show(Report $report): JsonResponse
    {
        return $this->success(new ReportResource($report));
    }

    /**
     * POST /api/v1/reports
     */
    public function store(UpsertReportRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $uploadedFile        = $request->file('file');
            $data['file_path']        = $uploadedFile->store('documents/reports', 'public');
            $data['file_size_bytes']  = $uploadedFile->getSize();
        }

        if ($request->hasFile('cover_image')) {
            $data['cover_image_path'] = $request->file('cover_image')->store('images/reports', 'public');
        }

        unset($data['file'], $data['cover_image']);

        $report = Report::create($data);

        return $this->created(new ReportResource($report), 'Report created successfully.');
    }

    /**
     * PUT /api/v1/reports/{report}
     */
    public function update(UpsertReportRequest $request, Report $report): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            if ($report->file_path) {
                Storage::disk('public')->delete($report->file_path);
            }
            $uploadedFile             = $request->file('file');
            $data['file_path']        = $uploadedFile->store('documents/reports', 'public');
            $data['file_size_bytes']  = $uploadedFile->getSize();
        }

        if ($request->hasFile('cover_image')) {
            if ($report->cover_image_path) {
                Storage::disk('public')->delete($report->cover_image_path);
            }
            $data['cover_image_path'] = $request->file('cover_image')->store('images/reports', 'public');
        }

        unset($data['file'], $data['cover_image']);

        $report->update($data);

        return $this->updated(new ReportResource($report), 'Report updated successfully.');
    }

    /**
     * DELETE /api/v1/reports/{report}
     */
    public function destroy(Report $report): JsonResponse
    {
        if ($report->file_path) {
            Storage::disk('public')->delete($report->file_path);
        }

        if ($report->cover_image_path) {
            Storage::disk('public')->delete($report->cover_image_path);
        }

        $report->delete();

        return $this->deleted('Report deleted successfully.');
    }
}
