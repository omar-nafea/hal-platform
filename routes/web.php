<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
  return view('welcome');
});

Route::get('/users',[UserController::class,'index']);
Route::get('/projects',[ProjectController::class,'index']);
Route::get('/ideas',[IdeaController::class,'index']);
Route::get('/categories',[CategoryController::class,'index']);
