<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ChatController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/chat', [ChatController::class, 'chat'])->name('chat');