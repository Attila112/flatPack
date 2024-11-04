<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('user_id');
            $table->longText('description');
            $table->integer('size');
            $table->string('city');
            $table->string('street');
            $table->integer('house_number');
            $table->integer('rooms');
            $table->integer('bathroom_count');
            $table->integer('floor');
            $table->string('building_material');
            $table->string('type');
            $table->integer('plot_size');
            $table->boolean('garage');
            $table->string('facing');
            $table->float('price');
            $table->boolean('hasPicture');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
