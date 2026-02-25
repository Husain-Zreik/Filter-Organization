<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'title'           => $this->title,
            'description'     => $this->description,
            'category'        => $this->category,
            'file_url'        => $this->file_path
                                    ? Storage::disk('public')->url($this->file_path)
                                    : null,
            'cover_image'     => $this->cover_image_path
                                    ? Storage::disk('public')->url($this->cover_image_path)
                                    : null,
            'file_pages'      => $this->file_pages,
            'file_size_bytes' => $this->file_size_bytes,
            'file_size'       => $this->file_size_bytes
                                    ? $this->formatSize($this->file_size_bytes)
                                    : null,
            'is_featured'     => $this->is_featured,
            'publish_date'    => $this->publish_date?->toDateString(),
            'created_at'      => $this->created_at?->toISOString(),
            'updated_at'      => $this->updated_at?->toISOString(),
        ];
    }

    private function formatSize(int $bytes): string
    {
        if ($bytes >= 1024 * 1024) {
            return round($bytes / (1024 * 1024), 1) . ' MB';
        }

        return round($bytes / 1024) . ' KB';
    }
}
