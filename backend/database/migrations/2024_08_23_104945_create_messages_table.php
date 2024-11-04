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
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // id as primary key
            $table->unsignedBigInteger('id_user_from')->nullable(); // nullable foreign key to User model
            $table->unsignedBigInteger('id_user_to')->nullable(); // nullable foreign key to User model
            $table->foreignId('id_property')->nullable();
            $table->string('title'); // string containing the subject of the mail
            $table->text('message'); // text containing the body of the mail
            $table->timestamp('sent')->nullable(); // nullable timestamp for the date and time the mail was sent
            $table->timestamps(); // created timestamp (and updated)

            // Foreign key constraints
            $table->foreign('id_user_from')->references('id')->on('users')->onDelete('set null');
            $table->foreign('id_user_to')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
