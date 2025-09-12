<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Idea>
 */
class IdeaFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'name' => $this->faker->sentence(2),
      'field' => $this->faker->word(),
      'capacity' => $this->faker->numberBetween(50, 500),
      'cost' => $this->faker->numberBetween(5000, 50000),
      'description' => $this->faker->paragraph(),
      // add existing user id or create a new one
      'user_id' => \App\Models\User::factory(),
    ];
  }
}
