<?php

    use App\Models\GamePass;
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

    Route::get('game-participants/{gameId}', '\App\Http\Controllers\GameParticipantController@index');

    Route::group(['middleware' => ['auth:api']], function () {
        // your protected routes.
    });
    Route::put('gamepasses/{gamePass}', function(GamePass $gamePass) {
        if(auth()->id() !== $gamePass->owner_id) {
            return response()->json(['error' => 'Unauthorized action.'], 401);
        }

        $gamePass->update(request()->all());

        return response()->json($gamePass);
    })->middleware('authapi');
