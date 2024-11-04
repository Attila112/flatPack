<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/user/login', [UserController::class, 'userLogin']);
Route::post('/user/register', [UserController::class, 'registerUser']);
Route::middleware('auth:sanctum')->post('/user/logout', [UserController::class, 'userLogout']);

Route::get('/properties', [PropertyController::class, 'getAllProperties']);
Route::get('/properties/search', [PropertyController::class, 'searchProperty']);
Route::get('/properties/types', [PropertyController::class, 'getPropertyTypes']);
Route::middleware('auth:sanctum')->post('/properties/myproperties', [PropertyController::class, 'getAllPropertiesToUser']);
Route::post('/add/property', [PropertyController::class, 'addProperty']);
Route::delete('/deleteProperty/{id}', [PropertyController::class, 'deleteProperty']);

Route::post('/upload_image', [ImageController::class, 'store']);
Route::get('/image/{property_id}', [ImageController::class, 'getFirstPictures']);
Route::get('/images/{property_id}', [ImageController::class, 'getImages']);
//Route::get('/')

Route::get('/property/{property_id}', [PropertyController::class, 'getProperty']);
Route::get('/owner/{user_id}', [UserController::class, 'getUserNameAndEmail']);
//Route::get('/properties/number', [PropertyController::class, 'getPropertiesNumber']);


Route::post('/message/send', [MessageController::class, 'newMessage']);
Route::post('/user/messages', [MessageController::class, 'getMessages']);
Route::middleware('auth:sanctum')->post('/user/favorites', [FavoriteController::class, 'getUserFavorites']);
Route::middleware('auth:sanctum')->post('/favorites', [FavoriteController::class, 'addFavorite']);
Route::middleware('auth:sanctum')->post('/favorites/delete', [FavoriteController::class, 'removeFavorite']);
Route::post('/favorites/isin', [FavoriteController::class, 'checkIsItIn']);

