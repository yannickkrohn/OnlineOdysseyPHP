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
import DronePilot
    from "./DronePilot";
import Synchronizer
    from "../../Synchronizer";
import GameController
    from "../../GameController";
import GameAudio
    from "../../GameAudio";
import IntervalHandler
    from "../../IntervalHandler";
import Cloud
    from "./Cloud";
import Tips
    from "../../Tips";

const Mustache = require('mustache');


class ChapterC {
    static instance;

    constructor() {

        if (!ChapterC.instance) {
            ChapterC.instance = this;
        }

        return ChapterC.instance;
    }

    load(showCutscene, callback) {
        fetch('/templates/odysseys/brimstone/chapter_c.html')
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
        console.log("Show cutscene C");
        this.gameController = new GameController();

        var self = this;
        var video = $("#cutscene-c-one");
        if (this.gameController.gameData["gotFilesInTime"] === false){
            video = video =$("#cutscene-c-two");
        }
        video.fadeIn(500);

        video[0].play();
        video.on('ended', function () {
            $(this).fadeOut();
            self.chapterLoaded();
            self.synchronizer.socket.emit('cutSceneCFinished');

        });
    }

    chapterLoaded() {
        this.synchronizer = new Synchronizer();
        this.gameController = new GameController();

        this.gameAudio = new GameAudio();
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_c.mp3");
        this.gameAudio.fadeInMusic(3000);

        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.chat = new Chat();
        this.chat.init();
        this.tips = new Tips();
        this.tips.init();

        this.cloud = new Cloud();
        this.cloud.init();
    }


    unload() {
        console.log("Unloading Chapter C");
        this.gameAudio.fadeOutMusic(2000);

        this.intervallHandler = new IntervalHandler();
        this.intervallHandler.clear();
    }
}

export default ChapterC;

