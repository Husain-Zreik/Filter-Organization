<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\News;
use App\Models\Post;
use App\Models\Report;
use App\Models\Rumor;
use App\Models\TeamMember;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/dashboard
     *
     * Aggregate statistics for the admin dashboard.
     */
    public function stats(): JsonResponse
    {
        return $this->success([
            'stats' => [
                'rumors'      => Rumor::count(),
                'news'        => News::count(),
                'reports'     => Report::count(),
                'team'        => TeamMember::count(),
                'posts'       => Post::count(),
                'media'       => Media::count(),
            ],
            'recent_rumors' => Rumor::orderByDesc('publish_date')
                ->limit(5)
                ->get(['id', 'title', 'status', 'category', 'publish_date']),
        ]);
    }
}
