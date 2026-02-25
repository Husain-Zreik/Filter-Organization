<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Page;
use App\Models\Post;

class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Compute which pages and posts use this media as featured image.
        // Uses withoutGlobalScopes to also count drafts/scheduled content.
        $pageIds = Page::withoutGlobalScopes()
            ->where('featured_media_id', $this->id)
            ->pluck('id')
            ->map(fn ($id) => "page-{$id}")
            ->all();

        $postIds = Post::withoutGlobalScopes()
            ->where('featured_media_id', $this->id)
            ->pluck('id')
            ->map(fn ($id) => "post-{$id}")
            ->all();

        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'url'         => $this->url,          // via Media::getUrlAttribute()
            'mime_type'   => $this->mime_type,
            'size_bytes'  => $this->size_bytes,
            'size_label'  => $this->size_label,   // via Media::getSizeLabelAttribute()
            'attached_to' => array_merge($pageIds, $postIds),
            'created_at'  => $this->created_at?->toDateString(),
            'updated_at'  => $this->updated_at?->toISOString(),
        ];
    }
}
