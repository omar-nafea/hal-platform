<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  /** @use HasFactory<\Database\Factories\PostFactory> */
  use HasFactory, HasUuids;

  protected $table = 'posts';

  // I want to use UUIDs instead of auto-incrementing IDs
  protected $keyType = 'string';

  public $incrementing = false;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'title',
    'body',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'created_at' => 'datetime',
      'updated_at' => 'datetime',
    ];
  }
}