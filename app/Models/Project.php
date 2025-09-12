<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  /** @use HasFactory<\Database\Factories\ProjectFactory> */
  use HasFactory;
  protected $table = 'projects';

  protected $fillable = [
    'title',
    'description',
    'field'
  ];

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

}
