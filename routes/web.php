<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

Route::middleware('admin')->group(function () {

    Route::get('/admin', function () {
        return Inertia::render('Admin/index');
    });
    Route::get('/admin/courses', function () {
        return Inertia::render('Admin/Courses/Index');
    });
    Route::get('/admin/lessons', function () {
        return Inertia::render('Admin/Lessons/Index');
    });
    Route::get('/admin/users', function () {
        return Inertia::render('Admin/Users/Index');
    });
    Route::get('/admin/categories', function () {
        return Inertia::render('Admin/Categories/Index');
    });
    Route::get('/admin/products', function () {
        return Inertia::render('Admin/Products/ProductsIndex');
    });

    Route::get('/admin/transformations', function () {
        return Inertia::render('Admin/Transformations/TransformationsIndex');
    });
});





Route::get('/', function () {
    return Inertia::render('Homepage');
});

Route::get('/about', function () {
    return Inertia::render('AboutUs');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/services', function () {
    return Inertia::render('Services');
});

Route::get('/products', function () {
    return Inertia::render('ProductGallery');
});



require __DIR__ . '/auth.php';
