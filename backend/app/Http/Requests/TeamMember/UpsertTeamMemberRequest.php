<?php

namespace App\Http\Requests\TeamMember;

use Illuminate\Foundation\Http\FormRequest;

class UpsertTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:200'],
            'role'        => ['nullable', 'string', 'max:200'],
            'email'       => ['nullable', 'email', 'max:200'],
            'description' => ['nullable', 'string'],
            'skills'      => ['nullable', 'array'],
            'skills.*'    => ['string', 'max:100'],
            'image'       => ['nullable', 'image', 'max:10240'],
            'initials'    => ['nullable', 'string', 'max:10'],
            'sort_order'  => ['nullable', 'integer', 'min:0'],
        ];
    }
}
