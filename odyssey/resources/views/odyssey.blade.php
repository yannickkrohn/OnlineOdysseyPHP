<html><!--
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@*  ,%%%%%%%%%%%%%%%%%%%   %@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  @@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%* @@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@@@@@@@@
@@@@@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@@@@@
@@@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@@@
@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@
@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%# @@@@@
@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@
@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@
@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@
@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @
@((%%%%                                                                   %%%% @
@ %%%%%                                                                   %%%%%@
@ %%%%%                                                                   %%%%%
@ %%%%%             ACHTUNG: Inspektion des Quellcodes spoilert           %%%%%
@ %%%%%                        dir den weiteren Verlauf.                  %%%%%
@ %%%%%                                                                   %%%%%
@%*%%%%                                                                   %%%% @
@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @
@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@
@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@
@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@
@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%,,@@@@@
@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@
@@@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@@@
@@@@@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%* @@@@@@@@@@@
@@@@@@@@@@@@@@@ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  @@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#  @@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@   (%%%%%%%%%%%%%%%%%*   @@@@@@@@@@@@@@@@@@@@@@@@@@@
-->
    <script src="http://192.168.178.40:3000/socket.io/socket.io.js"></script>
    <link rel="stylesheet" href="/css/odysseys/brimstone/app.css">
    <link rel="stylesheet" href="/css/fontawesome.css">
    <link rel="stylesheet" href="/css/regular.css">
    <link rel="stylesheet" href="/css/solid.css">
    <link rel="stylesheet" href="/css/brands.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,600&display=swap" rel="stylesheet">
    <script src="/assets/video/odysseys/brimstone/3d/Build/vent2.loader.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js" integrity="sha512-yAr4fN9WZH6hESbOwoFZGtSgOP+LSZbs/JeoDr02pOX4yUFfI++qC9YwIQXIGffhnzliykJtdWTV/v3PxSz8aw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <div id="game-wrapper">
        @if($gamePass->status == 0)
            <div class="game-starter">
                <div>
                    Auf welcher Schwierigkeitsstufe möchtest du spielen?
                    <div>
                        <select name="" id="" class="form-select js-game-difficulty">
                            <option value="1">Leicht</option>
                            <option value="2" selected>Normal (Standard)</option>
                            <option value="3">Experte</option>
                        </select>
                        <div>
                            <button style="width: 300px;" type="button" class="js-start-lobby btn btn-primary">Lobby starten</button>
                        </div>

                    </div>
                </div>
            </div>
        @else
            <div id="loader">
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div id="loader-el"></div>
            </div>
        @endif
    </div>

    <div class="game-controller">
        <span class="icon"></span>
        <div class="controller-options">
            <h2 class="headline">Hinweise</h2>
            <div id="tips-wrapper">
            </div>
            <h2 class="headline">Cutscenes</h2>
        </div>
    </div>
    <!--
    <button id="play-intro-button">Play Intro</button>
    <button id="change-color">Change color</button>
 -->
    <script src="https://code.createjs.com/preloadjs-0.6.1.min.js"></script>

    <script src="/js/app.js"></script>

    <script>
        window.preloadCutscenes();

    </script>
    <div class="cutscene-holder"></div>
    @if($gamePass->game->game_code === "brimstone")

    @endif
    <script>

        @if( auth()->check() )
            window.apiToken = "{{ auth()->user()->api_token }}";

        @if( $gamePass->isOwner(auth()->id()) )
            window.gameOwner = true;
        @endif

        @endif

        document.addEventListener('DOMContentLoaded', function () {
            @if ($gamePass->status == 0)
            window.gameController.prepareForInit("{{ $gamePass->id }}");
            @else


            window.gameController.init("{{ $gamePass->id }}", {{ $gamePass->status }}, "{{ $gamePass->game->game_code }}", {{ $gamePass->difficulty }}, ' {!! $gamePass->game_data !!}', "{{$gamePass->chapter}}");
            @endif
        });
    </script>

</html>
