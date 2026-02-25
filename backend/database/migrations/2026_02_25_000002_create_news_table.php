<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category', 50)->index();   // security|tech|media|training|health|economy|education|culture
            $table->string('location')->nullable();
            $table->string('image_path')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->json('tags')->nullable();            // ["عاجل", "مباشر", "رسمي"]
            $table->timestamp('publish_date')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
