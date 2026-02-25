<?php

namespace App\Http\Requests\Report;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'           => ['required', 'string', 'max:500'],
            'description'     => ['nullable', 'string'],
            'category'        => ['required', Rule::in(['periodic', 'health', 'tech', 'security', 'economy', 'education'])],
            'file'            => ['nullable', 'file', 'mimes:pdf', 'max:51200'],     // 50 MB PDF
            'cover_image'     => ['nullable', 'image', 'max:10240'],                 // 10 MB image
            'file_pages'      => ['nullable', 'integer', 'min:1'],
            'file_size_bytes' => ['nullable', 'integer', 'min:0'],
            'is_featured'     => ['boolean'],
            'publish_date'    => ['nullable', 'date'],
        ];
    }
}
