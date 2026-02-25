<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RumorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'description'  => $this->description,
            'status'       => $this->status,
            'category'     => $this->category,
            'source'       => $this->source,
            'image'        => $this->image_path
                                ? Storage::disk('public')->url($this->image_path)
                                : null,
            'verified_at'  => $this->verified_at?->toISOString(),
            'publish_date' => $this->publish_date?->toDateString(),
            'created_at'   => $this->created_at?->toISOString(),
            'updated_at'   => $this->updated_at?->toISOString(),
        ];
    }
}
