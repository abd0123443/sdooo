<?php

use App\Http\Controllers\Api\AbouteController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TransformationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/categories/list', [CategoriesController::class, 'index']);
Route::post('/categories/store', [CategoriesController::class, 'store']);
Route::post('/categories/update/{category}', [CategoriesController::class, 'update']);
Route::delete('/categories/{category}', [CategoriesController::class, 'destroy']);


Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);


Route::get('/transformations', [TransformationController::class, 'index']);
Route::post('/transformations', [TransformationController::class, 'store']);
Route::post('/transformations/{transformation}', [TransformationController::class, 'update']);
Route::delete('/transformations/{transformation}', [TransformationController::class, 'destroy']);



Route::get('/abouts', [AbouteController::class, 'index']);
Route::post('/abouts', [AbouteController::class, 'store']);
Route::post('/abouts/{aboute}', [AbouteController::class, 'update']);
Route::delete('/abouts/{aboute}', [AbouteController::class, 'destroy']);






