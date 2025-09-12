<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    /** @use HasFactory<\Database\Factories\IdeaFactory> */
    use HasFactory;
     protected $fillable = [
        'name',
        'field',
        'capacity',
        'cost',
        'description',




        
    ];
}



