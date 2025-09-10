<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Category;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            ['title' => 'AI Chatbot', 'description' => 'Prototype chatbot for customer support', 'field' => 'Technology'],
            ['title' => 'E-Learning App', 'description' => 'Mobile app for online courses', 'field' => 'Education'],
            ['title' => 'Health Tracker', 'description' => 'App for tracking fitness goals', 'field' => 'Health'],
            ['title' => 'Online Store', 'description' => 'E-commerce prototype website', 'field' => 'E-commerce'],
            ['title' => 'Music Streaming', 'description' => 'Platform for music lovers', 'field' => 'Entertainment'],
        ];

        foreach ($projects as $project) {
            Project::create([
                'title' => $project['title'],
                'description' => $project['description'],
                'field' => $project['field'],
                'category_id' => Category::inRandomOrder()->first()->id,
            ]);
        
        }
        
        for ($i = 6; $i <= 10; $i++) {
            Project::create([
                'title' => 'Project ' . $i,
                'description' => 'Description for project ' . $i,
                'field' => 'Technology',
                'category_id' => Category::inRandomOrder()->first()->id,
            ]);
        }
    }

}
    
    
