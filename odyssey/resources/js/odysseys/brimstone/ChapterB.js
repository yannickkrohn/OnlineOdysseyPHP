import Windows
    from "./Windows";
import MenuBar
    from "./MenuBar";
import Chat
    from "./Chat";
import FileServerRiddle
    from "./FileServerRiddle";
import Radio
    from "./Radio";
import Synchronizer
    from "../../Synchronizer";
import IntervalHandler
    from "../../IntervalHandler";
import GameAudio
    from "../../GameAudio";
import GameController
    from "../../GameController";
import LoginHackAnimation
    from "./LoginHackAnimation";
import Tips
    from "../../Tips";

const Mustache = require('mustache');


class ChapterB {
    static instance;

    constructor() {

        if (!ChapterB.instance) {
            ChapterB.instance = this;
        }

        return ChapterB.instance;
    }

    load(showCutscene, callback) {
        fetch('/templates/odysseys/brimstone/chapter_b.html')
            .then(response => response.text())
            .then(template => {

                document.querySelector('#game-wrapper').innerHTML = Mustache.render(template, {});
                if (showCutscene) {
                    this.showCutscene();
                } else {
                    this.chapterLoaded();
                }
                callback();
            });
    }


    showCutscene() {
        this.gameController = new GameController();

        var self = this;
        var video = $("#cutscene-b");
        if (this.gameController.gameData["foundHeliosInTime"] === false){
            video = video =$("#cutscene-b-three");
        }else if (this.gameController.gameData["heliosPositionCorrect"] === false){
            video = video =$("#cutscene-b-two");
        }

        video.fadeIn(500);

        video[0].play();
        video.on('ended', function () {
            $(this).fadeOut();
            self.chapterLoaded();
            self.synchronizer.socket.emit('cutSceneBFinished');
        });
    }

    chapterLoaded() {
        this.synchronizer = new Synchronizer();
        this.gameController = new GameController();

        this.fileServer = new FileServerRiddle();
        var gameData = this.gameController.gameData;
        this.synchronizer.socket.on('gameDataUpdate', (update) => {
            if ('fileServerStartTime' in update && 'fileServerStartTime' in update) {
                this.fileServer.startUpdatingProgressBar();
            }
        });
        if ('fileServerStartTime' in gameData && 'fileServerStartTime' in gameData) {
            this.fileServer.startUpdatingProgressBar();
        }else{
            this.synchronizer.socket.emit('cutSceneBFinished');
        }
        this.gameAudio = new GameAudio();
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_b.mp3");
        this.gameAudio.fadeInMusic(3000);

        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.chat = new Chat();
        this.chat.init();
        this.tips = new Tips();
        this.tips.init();

        this.loginAnimation = new LoginHackAnimation();
        setTimeout(() => {
            this.loginAnimation.fileServerCrack();

        }, 4000)

        setTimeout(() => {
            var radio = new Radio();
            //radio.radioTalk();
        }, 60000)
    }


    unload() {
        console.log("Unloading Chapter B");
        this.gameAudio.fadeOutMusic(2000);

        this.intervallHandler = new IntervalHandler();
        this.intervallHandler.clear();
    }
}

export default ChapterB;

