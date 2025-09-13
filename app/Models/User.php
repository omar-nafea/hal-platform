<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable, HasUuids, HasApiTokens;

  protected $table = 'users';

  // I want to use UUIDs instead of auto-incrementing IDs
  protected $keyType = 'string';
  public $incrementing = false;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'phone',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
      'created_at' => 'datetime',
      'updated_at' => 'datetime',
    ];
  }

  /**
   * Relationship: User has many ideas
   */
  public function ideas()
  {
    return $this->hasMany(Idea::class);
  }

  /**
   * Scope: Search users by name or email
   */
  public function scopeSearch(Builder $query, string $search): Builder
  {
    return $query->where(function ($q) use ($search) {
      $q->where('name', 'like', '%' . $search . '%')
        ->orWhere('email', 'like', '%' . $search . '%');
    });
  }

  /**
   * Scope: Filter verified users
   */
  public function scopeVerified(Builder $query): Builder
  {
    return $query->whereNotNull('email_verified_at');
  }

  /**
   * Scope: Filter unverified users
   */
  public function scopeUnverified(Builder $query): Builder
  {
    return $query->whereNull('email_verified_at');
  }

  /**
   * Scope: Get recent users
   */
  public function scopeRecent(Builder $query, int $days = 30): Builder
  {
    return $query->where('created_at', '>=', now()->subDays($days));
  }

  /**
   * Scope: Users with ideas
   */
  public function scopeHasIdeas(Builder $query): Builder
  {
    return $query->has('ideas');
  }

  /**
   * Scope: Active users (have created ideas recently)
   */
  public function scopeActive(Builder $query, int $days = 30): Builder
  {
    return $query->whereHas('ideas', function ($q) use ($days) {
      $q->where('created_at', '>=', now()->subDays($days));
    });
  }

  /**
   * Get the total number of ideas created by this user
   */
  public function getIdeasCountAttribute(): int
  {
    return $this->ideas()->count();
  }

  /**
   * Get the latest ideas by this user
   */
  public function getLatestIdeas(int $limit = 5)
  {
    return $this->ideas()
      ->orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Get ideas by field for this user
   */
  public function getIdeasByField(string $field)
  {
    return $this->ideas()
      ->where('field', $field)
      ->orderBy('created_at', 'desc')
      ->get();
  }

  /**
   * Get user's idea statistics
   */
  public function getIdeaStatistics()
  {
    $ideas = $this->ideas();

    return [
      'total_ideas' => $ideas->count(),
      'recent_ideas' => $ideas->where('created_at', '>=', now()->subDays(30))->count(),
      'average_cost' => $ideas->avg('cost'),
      'total_cost' => $ideas->sum('cost'),
      'average_capacity' => $ideas->avg('capacity'),
      'total_capacity' => $ideas->sum('capacity'),
      'fields_count' => $ideas->whereNotNull('field')->distinct('field')->count(),
      'ideas_by_field' => $ideas->selectRaw('field, COUNT(*) as count')
        ->whereNotNull('field')
        ->groupBy('field')
        ->get(),
    ];
  }

  /**
   * Check if user has verified email
   */
  public function isVerified(): bool
  {
    return !is_null($this->email_verified_at);
  }

  /**
   * Check if user is active (has created ideas recently)
   */
  public function isActive(int $days = 30): bool
  {
    return $this->ideas()
      ->where('created_at', '>=', now()->subDays($days))
      ->exists();
  }

  /**
   * Check if user has ideas
   */
  public function hasIdeas(): bool
  {
    return $this->ideas()->exists();
  }

  /**
   * Get user's most used field
   */
  public function getFavoriteField(): ?string
  {
    $field = $this->ideas()
      ->selectRaw('field, COUNT(*) as count')
      ->whereNotNull('field')
      ->groupBy('field')
      ->orderBy('count', 'desc')
      ->first();

    return $field ? $field->field : null;
  }

  /**
   * Static method to get top users by ideas count
   */
  public static function getTopUsers(int $limit = 10)
  {
    return static::withCount('ideas')
      ->orderBy('ideas_count', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to get active users
   */
  public static function getActiveUsers(int $days = 30)
  {
    return static::whereHas('ideas', function ($q) use ($days) {
      $q->where('created_at', '>=', now()->subDays($days));
    })->get();
  }

  /**
   * Static method to get user statistics
   */
  public static function getUserStatistics()
  {
    return [
      'total_users' => static::count(),
      'verified_users' => static::verified()->count(),
      'unverified_users' => static::unverified()->count(),
      'users_with_ideas' => static::has('ideas')->count(),
      'active_users' => static::active()->count(),
      'recent_registrations' => static::recent()->count(),
    ];
  }
}
