<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Project extends Model
{
  /** @use HasFactory<\Database\Factories\ProjectFactory> */
  use HasFactory;

  protected $table = 'projects';

  protected $fillable = [
    'title',
    'description',
    'field',
    'category_id'
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
   * Relationship: Project belongs to a category
   */
  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  /**
   * Scope: Search projects by title, description, or field
   */
  public function scopeSearch(Builder $query, string $search): Builder
  {
    return $query->where(function ($q) use ($search) {
      $q->where('title', 'like', '%' . $search . '%')
        ->orWhere('description', 'like', '%' . $search . '%')
        ->orWhere('field', 'like', '%' . $search . '%');
    });
  }

  /**
   * Scope: Filter projects by category
   */
  public function scopeInCategory(Builder $query, int $categoryId): Builder
  {
    return $query->where('category_id', $categoryId);
  }

  /**
   * Scope: Filter projects by field
   */
  public function scopeInField(Builder $query, string $field): Builder
  {
    return $query->where('field', $field);
  }

  /**
   * Scope: Get recent projects
   */
  public function scopeRecent(Builder $query, int $days = 30): Builder
  {
    return $query->where('created_at', '>=', now()->subDays($days));
  }

  /**
   * Scope: Get featured projects (latest ones)
   */
  public function scopeFeatured(Builder $query, int $limit = 10): Builder
  {
    return $query->orderBy('created_at', 'desc')->limit($limit);
  }

  /**
   * Get the category name
   */
  public function getCategoryNameAttribute(): string
  {
    return $this->category ? $this->category->title : 'Uncategorized';
  }

  /**
   * Get projects in the same category
   */
  public function getRelatedProjects(int $limit = 5)
  {
    return static::where('category_id', $this->category_id)
      ->where('id', '!=', $this->id)
      ->orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Get projects in the same field
   */
  public function getProjectsInSameField(int $limit = 5)
  {
    if (!$this->field) {
      return collect();
    }

    return static::where('field', $this->field)
      ->where('id', '!=', $this->id)
      ->orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to get projects by field
   */
  public static function getByField(string $field)
  {
    return static::where('field', $field)
      ->orderBy('created_at', 'desc')
      ->get();
  }

  /**
   * Static method to get popular fields
   */
  public static function getPopularFields(int $limit = 10)
  {
    return static::selectRaw('field, COUNT(*) as count')
      ->whereNotNull('field')
      ->groupBy('field')
      ->orderBy('count', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to search projects
   */
  public static function searchProjects(string $query)
  {
    return static::search($query)->get();
  }
}
