<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'title_en'           => $this->title_en,
            'title_ar'           => $this->title_ar,
            'slug'               => $this->slug,
            'category'           => $this->category,
            'status'             => $this->status,
            'excerpt_en'         => $this->excerpt_en,
            'excerpt_ar'         => $this->excerpt_ar,
            'content_en'         => $this->content_en,
            'content_ar'         => $this->content_ar,
            'featured_media_id'  => $this->featured_media_id,
            'featured_media'     => $this->whenLoaded('featuredMedia', fn () =>
                new MediaResource($this->featuredMedia)
            ),
            'publish_date'       => $this->publish_date?->toDateString(),
            'created_at'         => $this->created_at?->toISOString(),
            'updated_at'         => $this->updated_at?->toISOString(),
        ];
    }
}
