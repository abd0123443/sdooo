<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Category;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
if (strpos(request()->getHttpHost(), 'www.') === 0) {
    $newUrl = str_replace('www.', '', request()->getFullUrl());
    header("Location: {$newUrl}", true, 301);
    exit;
}
if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'www.') === 0) {
    $newUrl = str_replace('www.', '', $_SERVER['HTTP_HOST']);
    header("Location: https://{$newUrl}{$_SERVER['REQUEST_URI']}", true, 301);
    exit;
}
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
    Route::get('/admin/Aboutes', function () {
        return Inertia::render('Admin/About_Us/Index');
    });
});





Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('AboutUs');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});
Route::get('/Building_Entrance_Door', function () {
    return Inertia::render('Building_Entrance_Door');
});
Route::get('/Fire_Door', function () {
    return Inertia::render('Fire_Door');
});
Route::get('/Villa_Doors', function () {
    return Inertia::render('Villa_Doors');
});
Route::get('/Steel_Door', function () {
    return Inertia::render('Steel_Door');
});
Route::get('/about_us', function () {
    return Inertia::render('About_Us');
});
Route::options('/{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN');
})->where('any', '.*');


require __DIR__ . '/auth.php';
