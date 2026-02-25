<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamMember\UpsertTeamMemberRequest;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/v1/team
     */
    public function index(Request $request): JsonResponse
    {
        $query = TeamMember::query();

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Override global scope ordering only if explicit sort requested
        if ($request->filled('sort_by')) {
            $sortBy  = in_array($request->sort_by, ['name', 'role', 'email', 'sort_order', 'created_at'])
                         ? $request->sort_by : 'sort_order';
            $sortDir = $request->sort_dir === 'desc' ? 'desc' : 'asc';
            $query->withoutGlobalScope('ordered')->orderBy($sortBy, $sortDir);
        }

        $members = $query->paginate($request->get('per_page', 15));

        return $this->paginated(TeamMemberResource::collection($members));
    }

    /**
     * GET /api/v1/team/{teamMember}
     */
    public function show(TeamMember $teamMember): JsonResponse
    {
        return $this->success(new TeamMemberResource($teamMember));
    }

    /**
     * POST /api/v1/team
     */
    public function store(UpsertTeamMemberRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('images/team', 'public');
        }

        unset($data['image']);

        $member = TeamMember::create($data);

        return $this->created(new TeamMemberResource($member), 'Team member created successfully.');
    }

    /**
     * PUT /api/v1/team/{teamMember}
     */
    public function update(UpsertTeamMemberRequest $request, TeamMember $teamMember): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($teamMember->image_path) {
                Storage::disk('public')->delete($teamMember->image_path);
            }
            $data['image_path'] = $request->file('image')->store('images/team', 'public');
        }

        unset($data['image']);

        $teamMember->update($data);

        return $this->updated(new TeamMemberResource($teamMember), 'Team member updated successfully.');
    }

    /**
     * DELETE /api/v1/team/{teamMember}
     */
    public function destroy(TeamMember $teamMember): JsonResponse
    {
        if ($teamMember->image_path) {
            Storage::disk('public')->delete($teamMember->image_path);
        }

        $teamMember->delete();

        return $this->deleted('Team member deleted successfully.');
    }
}
