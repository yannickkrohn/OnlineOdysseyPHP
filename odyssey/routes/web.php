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

    Route::group([

        'namespace' => 'App\Http\Controllers',

    ], function($router) {

        Route::post('/login', 'AuthController@login');
        Route::get('/login', ['as' => 'login', 'uses' => 'AuthController@load']);
        Route::get('/logout', 'AuthController@destroy');

        Route::get('/signup', 'RegisterController@load');
        Route::post('signup', 'RegisterController@store');

        Route::get('/dashboard', 'DashboardController@load')->middleware('auth');

        Route::get('/odyssey', 'OdysseyController@load');


    });

    Route::get('/', function() {
        return view('welcome');
    });

