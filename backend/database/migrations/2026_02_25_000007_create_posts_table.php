<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_ar');
            $table->string('slug')->unique();
            $table->string('category', 50)->default('news')->index(); // news|update|announcement
            $table->enum('status', ['draft', 'published', 'scheduled'])->default('draft')->index();
            $table->text('excerpt_en')->nullable();
            $table->text('excerpt_ar')->nullable();
            $table->longText('content_en')->nullable();
            $table->longText('content_ar')->nullable();
            $table->foreignId('featured_media_id')
                  ->nullable()
                  ->constrained('media')
                  ->nullOnDelete();
            $table->timestamp('publish_date')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
