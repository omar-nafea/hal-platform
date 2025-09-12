<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Hash;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Project;
use App\Models\Idea;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
 
    \App\Models\Post::factory(10)->create(); 
   
    // User::factory()->create([
    //   'name' => 'Admin',
    //   'email' => 'Admin@example.com',
    //   'password' => Hash::make('12345678'),
    // ]);
        User::factory(10)->create();
        Category::factory(5)->create();
        Project::factory(10)->create();
        Idea::factory(5)->create();
  }
}
