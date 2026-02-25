<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'disk',
        'path',
        'mime_type',
        'size_bytes',
    ];

    protected $casts = [
        'size_bytes' => 'integer',
    ];

    // ─── Accessors ────────────────────────────────────────────────────────────

    /**
     * Full public URL for the file.
     */
    public function getUrlAttribute(): string
    {
        return Storage::disk($this->disk)->url($this->path);
    }

    /**
     * Human-readable file size (e.g. "182 KB", "2.4 MB").
     */
    public function getSizeLabelAttribute(): string
    {
        $bytes = $this->size_bytes;

        if ($bytes >= 1024 * 1024) {
            return round($bytes / (1024 * 1024), 1) . ' MB';
        }

        return round($bytes / 1024) . ' KB';
    }

    // ─── Relationships ────────────────────────────────────────────────────────

    public function pages()
    {
        return $this->hasMany(Page::class, 'featured_media_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'featured_media_id');
    }

    // ─── Scopes ───────────────────────────────────────────────────────────────

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where('name', 'like', "%{$term}%");
    }

    public function scopeOfType(Builder $query, string $mimeType): Builder
    {
        return $query->where('mime_type', $mimeType);
    }
}
