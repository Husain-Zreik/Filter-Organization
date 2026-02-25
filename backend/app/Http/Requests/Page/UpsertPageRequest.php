<?php

namespace App\Http\Requests\Page;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $pageId = $this->route('page')?->id;

        return [
            'title_en'          => ['required', 'string', 'max:500'],
            'title_ar'          => ['required', 'string', 'max:500'],
            'slug'              => [
                'required',
                'string',
                'max:200',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('pages', 'slug')->ignore($pageId)->whereNull('deleted_at'),
            ],
            'category'          => ['required', Rule::in(['general', 'policy', 'faq'])],
            'status'            => ['required', Rule::in(['draft', 'published', 'scheduled'])],
            'excerpt_en'        => ['nullable', 'string', 'max:1000'],
            'excerpt_ar'        => ['nullable', 'string', 'max:1000'],
            'content_en'        => ['required', 'string'],
            'content_ar'        => ['required', 'string'],
            'featured_media_id' => ['nullable', 'integer', Rule::exists('media', 'id')->whereNull('deleted_at')],
            'publish_date'      => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'slug.regex' => 'Slug may only contain lowercase letters, numbers, and hyphens.',
        ];
    }
}
