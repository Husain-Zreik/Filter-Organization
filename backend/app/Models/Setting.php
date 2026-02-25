<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    // Settings are config — no soft deletes, no factory needed.

    protected $fillable = [
        'section',
        'key',
        'title_en',
        'title_ar',
        'value_en',
        'value_ar',
        'status',
    ];

    // ─── Cache Helpers ────────────────────────────────────────────────────────

    public static function getCached(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('settings.all', now()->addHour(), function () {
            return static::where('status', 'active')->get();
        });
    }

    public static function clearCache(): void
    {
        Cache::forget('settings.all');
    }

    // ─── Lifecycle Hooks ──────────────────────────────────────────────────────

    protected static function booted(): void
    {
        // Clear cache whenever a setting is saved or deleted
        static::saved(fn () => static::clearCache());
        static::deleted(fn () => static::clearCache());
    }

    // ─── Scopes ───────────────────────────────────────────────────────────────

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(function (Builder $q) use ($term) {
            $q->where('key', 'like', "%{$term}%")
              ->orWhere('title_en', 'like', "%{$term}%")
              ->orWhere('title_ar', 'like', "%{$term}%")
              ->orWhere('value_en', 'like', "%{$term}%")
              ->orWhere('value_ar', 'like', "%{$term}%");
        });
    }

    public function scopeOfSection(Builder $query, string $section): Builder
    {
        return $query->where('section', $section);
    }

    public function scopeOfStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }
}
