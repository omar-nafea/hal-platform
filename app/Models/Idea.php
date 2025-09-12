<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
  /** @use HasFactory<\Database\Factories\IdeaFactory> */
  use HasFactory, HasUuids;
  protected $table = 'ideas';

  // I want to use UUIDs instead of auto-incrementing IDs
  protected $keyType = 'string';

  public $incrementing = false;


  protected $fillable = [
    'name',
    'field',
    'capacity',
    'cost',
    'description',
  ];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}



