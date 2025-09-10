<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Idea;
use App\Models\User;

class IdeaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ideas = [
            ['name' => 'Smart Home Automation', 'field' => 'Technology', 'capacity' => 100, 'cost' => 20000, 'description' => 'IoT devices to control home appliances remotely'],
            ['name' => 'Virtual Classroom', 'field' => 'Education', 'capacity' => 300, 'cost' => 15000, 'description' => 'Interactive online classroom with video lectures'],
            ['name' => 'Health Monitor Band', 'field' => 'Health', 'capacity' => 200, 'cost' => 25000, 'description' => 'Wearable device to monitor heart rate and sleep patterns'],
            ['name' => 'Fashion E-Store', 'field' => 'E-commerce', 'capacity' => 500, 'cost' => 10000, 'description' => 'Online clothing store prototype'],
            ['name' => 'Indie Music Hub', 'field' => 'Entertainment', 'capacity' => 150, 'cost' => 12000, 'description' => 'Platform to promote indie artists'],
        ];

        foreach ($ideas as $idea) {
            Idea::create([
                'name' => $idea['name'],
                'field' => $idea['field'],
                'capacity' => $idea['capacity'],
                'cost' => $idea['cost'],
                'description' => $idea['description'],
                'user_id' => User::inRandomOrder()->first()->id,
            ]);
        }
    }
    }

