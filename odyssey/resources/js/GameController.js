import Lobby
    from './Lobby';
import Brimstone
    from "./odysseys/brimstone/Brimstone";

import Synchronizer
    from "./Synchronizer";
import PlayerClient
    from "./PlayerClient";
import GameAudio
    from "./GameAudio";


class GameController {

    static instance;

    constructor() {
        if (!GameController.instance) {
            GameController.instance = this;
        }

        return GameController.instance;
    }

    addStartupOverlay(callback) {

        $('<div>').attr('id', 'startup-overlay').addClass('startup-overlay').appendTo('body');
        $('<div>').html('<div class="o-logo"><img style="width: 70px; margin: 41px auto;  display: block;" src="/assets/img/logo-black.svg"></div>Bereit wieder <br />ins Geschehen einzusteigen?').appendTo('#startup-overlay');

        $('<button>').text("Los geht's").click(function () {
            $('#startup-overlay').remove();
            callback();
        }).appendTo('#startup-overlay');
    }

    prepareForInit(gamePassId) {
        $(".js-start-lobby").on("click", function (e) {
            e.preventDefault();

            $.ajax({
                url: '/api/gamepasses/' + gamePassId,
                method: 'PUT',
                data: {
                    status: 1,
                    difficulty: $(".js-game-difficulty").val()
                },
                headers: {
                    'Authorization': 'Bearer ' + window.apiToken
                },
                success: function (data) {
                    location.reload();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        });
    }

    init(gamePassId, gameState, gameCode, difficulty, gameData, currentChapter) {
        this.gameState = gameState;
        this.gameData = JSON.parse(gameData);
        this.currentChapter = currentChapter;
        this.currentChapterObj = null;
        this.difficulty = difficulty;
        this.gamePassId = gamePassId;

        this.gameAudio = new GameAudio();
        this.gameAudio.init();

        this.client = new PlayerClient();
        this.client.init();

        this.game = new Brimstone();

        $(".game-controller .icon").bind("click", function () {
          $(".game-controller").toggleClass("toggled");
          $("#game-wrapper").toggleClass("blur");
        });


        let animationMenu = lottie.loadAnimation({
            container: document.getElementById('loader-el'),
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: "/assets/video/loading.json"
        });

        animationMenu.play();

        this.game.preloadCutscenes(() => {
            this.client.getClientIdentity((clientIdentity) => {
                this.synchronizer = new Synchronizer();
                this.synchronizer.init();
                this.loadGame(clientIdentity);
            });
        });
    }

    getGameParticipants() {
        const gameId = this.gamePassId;
        return new Promise((resolve, reject) => {
            fetch(`/api/game-participants/${gameId}`)
                .then(response => response.json())
                .then(data => resolve(data.data))
                .catch(error => reject(error));
        });
    }


    pickElementWithSeed(arr, seed) {
        // Convert seed string to a number

        seed = seed + this.gamePassId;

        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Generate a positive index within range of the array
        const index = Math.abs(hash % arr.length);

        // Return the corresponding element
        return arr[index];
    }

    loadGame(clientIdentity) {
        console.info("Client loaded");


        if (this.gameState === 1) {
            const lobby = new Lobby();
            lobby.init();
            return false;
        } else if (this.gameState === 2) {
            console.info("Client22 loassded");

            this.game.init(false);
        }
    }

    startOdyssey() {

        let elem = document.documentElement;

        elem.requestFullscreen({navigationUI: "show"}).then(() => {
        }).catch((err) => {
        });

        setTimeout(() => {
            const game = new Brimstone();
            game.init(true);
            this.game = game;
        }, 5000);
    }

    changeChapter(chapter) {
        if (this.currentChapterObj !== null) {
            this.currentChapterObj.unload();
        }
        this.currentChapter = chapter;
        this.game.updateGameUIForChapter();
    }
}

export default GameController;
