<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaService
{
    private const DISK = 'public';

    /**
     * Store an uploaded file and create a Media record.
     */
    public function store(UploadedFile $file, ?string $customName = null): Media
    {
        $originalName = $customName ?? $file->getClientOriginalName();
        $extension    = $file->getClientOriginalExtension();
        $safeName     = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '.' . $extension;
        $directory    = $this->resolveDirectory($file->getMimeType());

        // Store with a unique hashed path to avoid collisions
        $path = $file->store($directory, self::DISK);

        return Media::create([
            'name'      => $originalName,
            'disk'      => self::DISK,
            'path'      => $path,
            'mime_type' => $file->getMimeType(),
            'size_bytes'=> $file->getSize(),
        ]);
    }

    /**
     * Delete file from disk and soft-delete the Media record.
     */
    public function delete(Media $media): void
    {
        // Nullify references in pages and posts first (DB FK cascade handles this,
        // but explicit is clearer if cascade is ever changed).
        \App\Models\Page::where('featured_media_id', $media->id)
            ->update(['featured_media_id' => null]);

        \App\Models\Post::where('featured_media_id', $media->id)
            ->update(['featured_media_id' => null]);

        // Remove physical file
        if (Storage::disk(self::DISK)->exists($media->path)) {
            Storage::disk(self::DISK)->delete($media->path);
        }

        $media->delete();
    }

    /**
     * Route images to /images and documents to /documents.
     */
    private function resolveDirectory(string $mimeType): string
    {
        return str_starts_with($mimeType, 'image/') ? 'images' : 'documents';
    }
}
