<?php

namespace App\Http\Requests\News;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertNewsRequest extends FormRequest
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
            'category'     => ['required', Rule::in(['security', 'tech', 'media', 'training', 'health', 'economy', 'education', 'culture'])],
            'location'     => ['nullable', 'string', 'max:200'],
            'image'        => ['nullable', 'image', 'max:10240'],
            'is_featured'  => ['boolean'],
            'tags'         => ['nullable', 'array'],
            'tags.*'       => ['string', 'max:100'],
            'publish_date' => ['nullable', 'date'],
        ];
    }
}
