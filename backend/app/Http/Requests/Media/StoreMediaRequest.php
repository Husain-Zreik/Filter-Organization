<?php

namespace App\Http\Requests\Media;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'mimes:jpeg,jpg,png,webp,pdf',
                'max:10240',   // 10 MB
            ],
            'name' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'A file is required.',
            'file.mimes'    => 'Allowed file types: JPEG, PNG, WebP, PDF.',
            'file.max'      => 'File size must not exceed 10 MB.',
        ];
    }
}
