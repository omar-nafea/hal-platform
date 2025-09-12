<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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

  /**
   * Scope: Search posts by title and body
   */
  public function scopeSearch(Builder $query, string $search): Builder
  {
    return $query->where(function ($q) use ($search) {
      $q->where('title', 'like', '%' . $search . '%')
        ->orWhere('body', 'like', '%' . $search . '%');
    });
  }

  /**
   * Scope: Get recent posts
   */
  public function scopeRecent(Builder $query, int $days = 30): Builder
  {
    return $query->where('created_at', '>=', now()->subDays($days));
  }

  /**
   * Scope: Get latest posts
   */
  public function scopeLatest(Builder $query, int $limit = 10): Builder
  {
    return $query->orderBy('created_at', 'desc')->limit($limit);
  }

  /**
   * Scope: Posts with long content
   */
  public function scopeLongContent(Builder $query, int $minLength = 500): Builder
  {
    return $query->whereRaw('LENGTH(body) >= ?', [$minLength]);
  }

  /**
   * Scope: Posts with short content
   */
  public function scopeShortContent(Builder $query, int $maxLength = 100): Builder
  {
    return $query->whereRaw('LENGTH(body) <= ?', [$maxLength]);
  }

  /**
   * Get the excerpt of the post body
   */
  public function getExcerptAttribute(int $length = 150): string
  {
    return strlen($this->body) > $length
      ? substr($this->body, 0, $length) . '...'
      : $this->body;
  }

  /**
   * Get the word count of the post body
   */
  public function getWordCountAttribute(): int
  {
    return str_word_count(strip_tags($this->body));
  }

  /**
   * Get the character count of the post body
   */
  public function getCharacterCountAttribute(): int
  {
    return strlen($this->body);
  }

  /**
   * Get the reading time estimate in minutes
   */
  public function getReadingTimeAttribute(): int
  {
    $wordsPerMinute = 200; // Average reading speed
    return max(1, ceil($this->getWordCountAttribute() / $wordsPerMinute));
  }

  /**
   * Check if post has long content
   */
  public function hasLongContent(int $minLength = 500): bool
  {
    return strlen($this->body) >= $minLength;
  }

  /**
   * Check if post is recent
   */
  public function isRecent(int $days = 7): bool
  {
    return $this->created_at >= now()->subDays($days);
  }

  /**
   * Get related posts (similar titles)
   */
  public function getRelatedPosts(int $limit = 5)
  {
    $titleWords = explode(' ', $this->title);
    $query = static::where('id', '!=', $this->id);

    foreach ($titleWords as $word) {
      if (strlen($word) > 3) { // Only use words longer than 3 characters
        $query->orWhere('title', 'like', '%' . $word . '%');
      }
    }

    return $query->orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to search posts
   */
  public static function searchPosts(string $query)
  {
    return static::search($query)->get();
  }

  /**
   * Static method to get popular posts (most recent as popularity indicator)
   */
  public static function getPopular(int $limit = 10)
  {
    return static::orderBy('created_at', 'desc')
      ->limit($limit)
      ->get();
  }

  /**
   * Static method to get post statistics
   */
  public static function getPostStatistics()
  {
    return [
      'total_posts' => static::count(),
      'recent_posts' => static::recent()->count(),
      'average_word_count' => static::selectRaw('AVG(LENGTH(body) - LENGTH(REPLACE(body, " ", "")) + 1) as avg_words')->first()->avg_words ?? 0,
      'average_character_count' => static::selectRaw('AVG(LENGTH(body)) as avg_chars')->first()->avg_chars ?? 0,
      'longest_post' => static::orderByRaw('LENGTH(body) DESC')->first(),
      'shortest_post' => static::orderByRaw('LENGTH(body) ASC')->first(),
    ];
  }

  /**
   * Static method to get content analysis
   */
  public static function getContentAnalysis()
  {
    return [
      'total_words' => static::selectRaw('SUM(LENGTH(body) - LENGTH(REPLACE(body, " ", "")) + 1) as total_words')->first()->total_words ?? 0,
      'total_characters' => static::selectRaw('SUM(LENGTH(body)) as total_chars')->first()->total_chars ?? 0,
      'posts_with_long_content' => static::longContent()->count(),
      'posts_with_short_content' => static::shortContent()->count(),
    ];
  }
}