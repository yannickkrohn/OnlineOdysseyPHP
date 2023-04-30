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
import VentLoader
    from "./VentLoader";
import GameController
    from "../../GameController";
import PlayerClient
    from "../../PlayerClient";
import PortScanner
    from "./PortScanner";
import Tips
    from "../../Tips";
import Synchronizer
    from "../../Synchronizer";
import IntervalHandler
    from "../../IntervalHandler";
import GameAudio
    from "../../GameAudio";

const Mustache = require('mustache');


class ChapterE {
    static instance;

    constructor() {
        this.synchronizer = new Synchronizer();

        if (!ChapterE.instance) {
            ChapterE.instance = this;
        }

        return ChapterE.instance;
    }

    load(showCutscene, callback) {
        this.gameController = new GameController();
        this.client = new PlayerClient();

        fetch('/templates/odysseys/brimstone/chapter_e.html')
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
        console.log("Show cutscene E");
        var self = this;
        var video = $("#cutscene-e");

        video.fadeIn(500);

        video[0].play();
        video.on('ended', function () {
            $(this).fadeOut();
            self.chapterLoaded();
            self.synchronizer.socket.emit('cutSceneEFinished');

        });
    }

    chapterLoaded() {
        this.gameAudio = new GameAudio();
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_e.mp3");
        this.gameAudio.fadeInMusic(3000);

        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.chat = new Chat();
        this.chat.init();
        this.portscanner = new PortScanner();
        this.portscanner.init();
        this.tips = new Tips();
        this.tips.init();
    }


    unload() {
        console.log("Unloading Chapter E");
        this.gameAudio.fadeOutMusic(2000);

        this.intervallHandler = new IntervalHandler();
        this.intervallHandler.clear();
    }
}

export default ChapterE;

