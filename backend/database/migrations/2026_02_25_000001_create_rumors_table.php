<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rumors', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['confirmed', 'false', 'unverified'])->default('unverified')->index();
            $table->string('category', 50)->index();   // health|security|economy|education|tech|media
            $table->string('source')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('publish_date')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rumors');
    }
};
