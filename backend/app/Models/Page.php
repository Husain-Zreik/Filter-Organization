<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title_en',
        'title_ar',
        'slug',
        'category',
        'status',
        'excerpt_en',
        'excerpt_ar',
        'content_en',
        'content_ar',
        'featured_media_id',
        'publish_date',
    ];

    protected $casts = [
        'publish_date' => 'datetime',
    ];

    // ─── Relationships ────────────────────────────────────────────────────────

    public function featuredMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_media_id');
    }

    // ─── Scopes ───────────────────────────────────────────────────────────────

    /**
     * Only pages that are published and whose publish_date has passed (or is null).
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
                     ->where(function (Builder $q) {
                         $q->whereNull('publish_date')
                           ->orWhere('publish_date', '<=', now());
                     });
    }

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(function (Builder $q) use ($term) {
            $q->where('title_en', 'like', "%{$term}%")
              ->orWhere('title_ar', 'like', "%{$term}%")
              ->orWhere('slug', 'like', "%{$term}%");
        });
    }

    public function scopeOfStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    public function scopeOfCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }
}
