<?php

namespace App\Http\Requests\Rumor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertRumorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'        => ['required', 'string', 'max:500'],
            'description'  => ['nullable', 'string'],
            'status'       => ['required', Rule::in(['confirmed', 'false', 'unverified'])],
            'category'     => ['required', Rule::in(['health', 'security', 'economy', 'education', 'tech', 'media'])],
            'source'       => ['nullable', 'string', 'max:500'],
            'image'        => ['nullable', 'image', 'max:10240'],  // 10 MB image upload
            'verified_at'  => ['nullable', 'date'],
            'publish_date' => ['nullable', 'date'],
        ];
    }
}
