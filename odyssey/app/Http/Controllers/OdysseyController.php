<?php

    namespace App\Http\Controllers;

    use App\Models\GamePass;
    use Illuminate\Database\Eloquent\ModelNotFoundException;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use App\Models\User;
    use Illuminate\Support\Facades\Cookie;

    class OdysseyController extends Controller {

        public function load(Request $request) {

            $gamePass = GamePass::find(app('request')->input('id'));

            if($gamePass === null || ($gamePass->status === 0 && auth()->id() !== $gamePass->owner_id) || ($gamePass->status > 1 && !$gamePass->hasParticipant($this->getPlayerClientId($gamePass->id)))) {
                return "Error";
            }


            return view('odyssey', compact('gamePass'));
        }

        /**
         * Get the player client ID for the given game.
         *
         * @param string $gameId
         * @return string|null
         */
        public function getPlayerClientId(string $gameId) {
            if (!isset($_COOKIE["savefiles"])){
                return 0;
            }
            $saveFiles = $_COOKIE["savefiles"];

            if($saveFiles) {

                $saveFiles = json_decode($saveFiles, true);

                if(isset($saveFiles[$gameId])) {
                    return $saveFiles[$gameId]['PlayerClientId'];
                }
            }

            return 0;
        }
    }
