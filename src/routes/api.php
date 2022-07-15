<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'api'], function(){
    Route::get('posts', [PostController::class, 'index']);
    Route::post('posts/create', [PostController::class, 'create']);
    Route::post('edit', [PostController::class, 'edit']);
    Route::post('update', [PostController::class, 'update']);
    Route::post('delete', [PostController::class, 'delete']);
});


