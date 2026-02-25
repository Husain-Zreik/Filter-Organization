<?php

namespace App\Http\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $settingId = $this->route('setting')?->id;

        return [
            'section'  => ['required', Rule::in(['site', 'announcement', 'notifications'])],
            'key'      => [
                'required',
                'string',
                'max:100',
                'regex:/^[a-zA-Z0-9_.]+$/',
                Rule::unique('settings', 'key')->ignore($settingId),
            ],
            'title_en' => ['required', 'string', 'max:300'],
            'title_ar' => ['required', 'string', 'max:300'],
            'value_en' => ['nullable', 'string'],
            'value_ar' => ['nullable', 'string'],
            'status'   => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    public function messages(): array
    {
        return [
            'key.regex' => 'Key may only contain letters, numbers, dots, and underscores.',
        ];
    }
}
