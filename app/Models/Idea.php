<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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
    'user_id',
  ];

  /**
   * The attributes that should be cast.
   */
  protected function casts(): array
  {
    return [
      'cost' => 'decimal:2',
      'capacity' => 'integer',
      'created_at' => 'datetime',
      'updated_at' => 'datetime',
    ];
  }

  /**
   * Relationship: Idea belongs to a user
   */
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Scope: Search ideas by name, description, or field
   */
  public function scopeSearch(Builder $query, string $search): Builder
  {
    return $query->where(function ($q) use ($search) {
      $q->where('name', 'like', '%' . $search . '%')
        ->orWhere('description', 'like', '%' . $search . '%')
        ->orWhere('field', 'like', '%' . $search . '%');
    });
  }

  /**
   * Scope: Filter ideas by field
   */
  public function scopeInField(Builder $query, string $field): Builder
  {
    return $query->where('field', $field);
  }

  /**
   * Scope: Filter ideas by capacity range
   */
  public function scopeCapacityBetween(Builder $query, int $min, int $max): Builder
  {
    return $query->whereBetween('capacity', [$min, $max]);
  }

  /**
   * Scope: Filter ideas by cost range
   */
  public function scopeCostBetween(Builder $query, float $min, float $max): Builder
  {
    return $query->whereBetween('cost', [$min, $max]);
  }

  /**
   * Scope: Get recent ideas
   */
  public function scopeRecent(Builder $query, int $days = 30): Builder
  {
    return $query->where('created_at', '>=', now()->subDays($days));
  }

  /**
   * Scope: Filter ideas by user
   */
  public function scopeByUser(Builder $query, string $userId): Builder
  {
    return $query->where('user_id', $userId);
  }

  /**
   * Scope: Ideas with low cost (below average)
   */
  public function scopeLowCost(Builder $query): Builder
  {
    $avgCost = static::avg('cost') ?? 0;
    return $query->where('cost', '<=', $avgCost);
  }

  /**
   * Scope: Ideas with high capacity (above average)
   */
  public function scopeHighCapacity(Builder $query): Builder
  {
    $avgCapacity = static::avg('capacity') ?? 0;
    return $query->where('capacity', '>=', $avgCapacity);
  }

  /**
   * Get the user name who created this idea
   */
  public function getUserNameAttribute(): string
  {
    return $this->user ? $this->user->name : 'Unknown User';
  }

  /**
   * Get ideas in the same field
   */
  public function getRelatedIdeas(int $limit = 5)
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
   * Get ideas by the same user
   */
  public function getOtherUserIdeas(int $limit = 5)
  {
    return static::where('user_id', $this->user_id)
      ->where('id', '!=', $this->id)
      ->orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Check if idea is cost-effective (below average cost)
   */
  public function isCostEffective(): bool
  {
    $avgCost = static::avg('cost') ?? 0;
    return ($this->cost ?? 0) <= $avgCost;
  }

  /**
   * Check if idea has high capacity (above average)
   */
  public function hasHighCapacity(): bool
  {
    $avgCapacity = static::avg('capacity') ?? 0;
    return ($this->capacity ?? 0) >= $avgCapacity;
  }

  /**
   * Static method to get ideas by field
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
   * Static method to get cost statistics
   */
  public static function getCostStatistics()
  {
    return [
      'average' => static::avg('cost'),
      'minimum' => static::min('cost'),
      'maximum' => static::max('cost'),
      'total' => static::sum('cost'),
    ];
  }

  /**
   * Static method to get capacity statistics
   */
  public static function getCapacityStatistics()
  {
    return [
      'average' => static::avg('capacity'),
      'minimum' => static::min('capacity'),
      'maximum' => static::max('capacity'),
      'total' => static::sum('capacity'),
    ];
  }
}



