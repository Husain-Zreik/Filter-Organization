<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'section'    => $this->section,
            'key'        => $this->key,
            'title_en'   => $this->title_en,
            'title_ar'   => $this->title_ar,
            'value_en'   => $this->value_en,
            'value_ar'   => $this->value_ar,
            'status'     => $this->status,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
