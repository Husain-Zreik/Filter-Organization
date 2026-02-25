<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category', 50)->index();   // periodic|health|tech|security|economy|education
            $table->string('file_path')->nullable();   // stored PDF path
            $table->string('cover_image_path')->nullable();
            $table->unsignedSmallInteger('file_pages')->nullable();
            $table->unsignedBigInteger('file_size_bytes')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->timestamp('publish_date')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
