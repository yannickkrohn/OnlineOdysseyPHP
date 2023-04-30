<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\GetGameParticipantsRequest;
    use App\Models\GameParticipant;
    use App\Models\GamePass;
    use Illuminate\Database\Eloquent\ModelNotFoundException;
    use Illuminate\Http\Request;

    class GameParticipantController extends Controller
    {
        public function index($gameId)
        {
            try {
                $game = GamePass::where('id', $gameId)->firstOrFail();
                $gameParticipants = GameParticipant::where('game_id', $gameId)->get();

                return response()->json([
                    'data' => $gameParticipants
                ]);
            } catch (\Exception $e) {
                if ($e instanceof ModelNotFoundException) {
                    return response()->json([
                        'error' => 'The specified game does not exist.'
                    ], 404);
                } else {
                    return response()->json([
                        'error' => 'An error occurred while retrieving the game participants.'
                    ], 500);
                }
            }
        }
    }
