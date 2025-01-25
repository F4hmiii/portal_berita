<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [NewsController::class, 'index'])->name('news.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/news', [NewsController::class, 'store'])->name('create.news');
    Route::get('/news', [NewsController::class, 'show'])->name('my.news');
    Route::get('/news/edit', [NewsController::class, 'edit'])->name('edit.news');
    Route::patch('/news/update', [NewsController::class, 'update'])->name('update.news');
    Route::delete('/news/delete', [NewsController::class, 'destroy'])->name('delete.news');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

