<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/roles', function () { return view('usersmanagement.roles.index'); })->name('Roles')->middleware('auth');
Route::get('/users', function () { return view('usersmanagement.users.index'); })->name('Users')->middleware('auth');
Route::get('/archieve-users', function () { return view('usersmanagement.users.archieve-users'); })->name('Archive Users')->middleware('auth');
Route::get('/customers', function () { return view('customersmanagement.customers.index'); })->name('Customers')->middleware('auth');
Route::get('/invoices','InvoicesController@index2')->name('Invoices')->middleware('auth');