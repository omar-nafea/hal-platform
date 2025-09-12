<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('ideas', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('name');
      $table->string('field')->nullable();
      $table->integer('capacity')->nullable();
      $table->decimal('cost', 10, 2)->nullable();
      $table->text('description')->nullable();
      $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('ideas');
  }
};
