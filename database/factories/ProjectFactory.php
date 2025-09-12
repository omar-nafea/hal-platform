<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'title' => $this->faker->sentence(3),
      'description' => $this->faker->paragraph(),
      'field' => $this->faker->word(),
      //  add existing category id
      'category_id' => \App\Models\Category::inRandomOrder()->first()->id ?? \App\Models\Category::factory()->create()->id,
    ];
  }
}
