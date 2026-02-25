<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class TeamMember extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'role',
        'email',
        'description',
        'skills',
        'image_path',
        'initials',
        'sort_order',
    ];

    protected $casts = [
        'skills'     => 'array',
        'sort_order' => 'integer',
    ];

    // ─── Scopes ───────────────────────────────────────────────────────────────

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(function (Builder $q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
              ->orWhere('role', 'like', "%{$term}%")
              ->orWhere('email', 'like', "%{$term}%")
              ->orWhere('description', 'like', "%{$term}%");
        });
    }

    // Default ordering by sort_order then name
    protected static function booted(): void
    {
        static::addGlobalScope('ordered', function (Builder $query) {
            $query->orderBy('sort_order')->orderBy('name');
        });
    }
}
