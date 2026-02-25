<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role')->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            $table->json('skills')->nullable();        // ["التحقق من الحقائق", "تحليل البيانات"]
            $table->string('image_path')->nullable();
            $table->string('initials', 10)->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
