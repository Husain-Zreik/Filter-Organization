<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TeamMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'role'        => $this->role,
            'email'       => $this->email,
            'description' => $this->description,
            'skills'      => $this->skills ?? [],
            'image'       => $this->image_path
                               ? Storage::disk('public')->url($this->image_path)
                               : null,
            'initials'    => $this->initials,
            'sort_order'  => $this->sort_order,
            'created_at'  => $this->created_at?->toISOString(),
            'updated_at'  => $this->updated_at?->toISOString(),
        ];
    }
}
