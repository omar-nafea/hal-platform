<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash; 
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    
         $users = [
            ['name' => 'Ahmed Ali',      'email' => 'ahmed.ali@example.com',     'phone' => '01011111111'],
            ['name' => 'Mona Hassan',    'email' => 'mona.hassan@example.com',   'phone' => '01022222222'],
            ['name' => 'Omar Khaled',    'email' => 'omar.khaled@example.com',   'phone' => '01033333333'],
            ['name' => 'Sara Youssef',   'email' => 'sara.youssef@example.com',  'phone' => '01044444444'],
            ['name' => 'Mohamed Ibrahim','email' => 'mohamed.ibrahim@example.com','phone' => '01055555555'],
            ['name' => 'Laila Mostafa',  'email' => 'laila.mostafa@example.com', 'phone' => '01066666666'],
            ['name' => 'Youssef Adel',   'email' => 'youssef.adel@example.com',  'phone' => '01077777777'],
            ['name' => 'Nourhan Tarek',  'email' => 'nourhan.tarek@example.com', 'phone' => '01088888888'],
            ['name' => 'Karim Samir',    'email' => 'karim.samir@example.com',   'phone' => '01099999999'],
            ['name' => 'Salma Nafea',    'email' => 'salma.nafea@example.com',   'phone' => '01012345678'],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'phone' => $user['phone'],
                'password' => Hash::make('12345678'), 
            ]);
        }
    }
}

