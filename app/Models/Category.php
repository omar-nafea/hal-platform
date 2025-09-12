<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Category extends Model
{
  /** @use HasFactory<\Database\Factories\CategoryFactory> */
  use HasFactory;

  protected $table = 'categories';

  protected $fillable = [
    'title',
  ];

  /**
   * The attributes that should be cast.
   */
  protected function casts(): array
  {
    return [
      'created_at' => 'datetime',
      'updated_at' => 'datetime',
    ];
  }

  /**
   * Relationship: Category has many projects
   */
  public function projects()
  {
    return $this->hasMany(Project::class);
  }

  /**
   * Scope: Search categories by title
   */
  public function scopeSearch(Builder $query, string $search): Builder
  {
    return $query->where('title', 'like', '%' . $search . '%');
  }

  /**
   * Scope: Categories with project counts
   */
  public function scopeWithProjectCounts(Builder $query): Builder
  {
    return $query->withCount('projects');
  }

  /**
   * Scope: Categories that have projects
   */
  public function scopeHasProjects(Builder $query): Builder
  {
    return $query->has('projects');
  }

  /**
   * Get the total number of projects in this category
   */
  public function getProjectsCountAttribute(): int
  {
    return $this->projects()->count();
  }

  /**
   * Check if category has any projects
   */
  public function hasProjects(): bool
  {
    return $this->projects()->exists();
  }

  /**
   * Get recent projects in this category
   */
  public function getRecentProjects(int $limit = 5)
  {
    return $this->projects()
      ->orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to get popular categories (with most projects)
   */
  public static function getPopular(int $limit = 10)
  {
    return static::withCount('projects')
      ->orderBy('projects_count', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to search categories
   */
  public static function searchByTitle(string $title)
  {
    return static::where('title', 'like', '%' . $title . '%')->get();
  }
}
