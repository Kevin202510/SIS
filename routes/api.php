<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/roles')->group(function() 
{
    Route::get('/', 'RolesController@index');
    Route::get('/list', 'RolesController@list');
    Route::post('/save', 'RolesController@save');
    Route::put('/{role}/update', 'RolesController@update');
});

Route::prefix('/users')->group(function() 
{
    Route::get('/', 'UsersController@index');
    Route::get('/archieve-users', 'UsersController@index1');
    Route::post('/save', 'UsersController@save');
    Route::put('/{user}/update', 'UsersController@update');
    Route::put('/{user}/updatestatus', 'UsersController@updatestatus');
    Route::delete('/archieve-users/{user}/recover', 'UsersController@recover');
    Route::delete('/{user}/destroy', 'UsersController@destroy');
});

Route::prefix('/customers')->group(function() 
{
    Route::get('/', 'CustomersController@index');
    Route::get('/list', 'CustomersController@list');
    Route::post('/save', 'CustomersController@save');
    Route::put('/{customer}/update', 'CustomersController@update');
    Route::delete('/{customer}/destroy', 'CustomersController@destroy');
});

Route::prefix('/invoices')->group(function() 
{
    Route::get('/', 'InvoicesController@index');
    Route::post('/save', 'InvoicesController@save');
    Route::put('/{invoice}/update', 'InvoicesController@update');
    Route::delete('/{invoice}/destroy', 'InvoicesController@destroy');
});
