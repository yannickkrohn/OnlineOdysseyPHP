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
import Synchronizer
    from "../../Synchronizer";
import Tips
    from "../../Tips";
import IntervalHandler
    from "../../IntervalHandler";
import GameAudio
    from "../../GameAudio";

const Mustache = require('mustache');


class ChapterD {
    static instance;

    constructor() {
        this.synchronizer = new Synchronizer();

        if (!ChapterD.instance) {
            ChapterD.instance = this;
        }

        return ChapterD.instance;
    }

    bindEvents(){
        $(document).on("click", ".check-security-questions", ()=>{
            this.synchronizer.socket.emit('validateSecurityQuestions', {
                "birthday": {
                    "day": $("#day").val(),
                    "month": $("#month").val(),
                    "year": $("#year").val()
                },
                "song": $("#song").val(),
                "street": $("#street").val()
            });

        });
    }

    load(showCutscene, callback) {

        fetch('/templates/odysseys/brimstone/chapter_d.html')
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
        console.log("Show cutscene d");


        var self = this;
        var video = $("#cutscene-d");

        video.fadeIn(500);

        video[0].play();
        video.on('ended', function () {
            $(this).fadeOut();
            self.chapterLoaded();
            self.synchronizer.socket.emit('cutSceneDFinished');

        });
    }
    chapterLoaded() {
        this.gameAudio = new GameAudio();
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_d.mp3");
        this.gameAudio.fadeInMusic(3000);

        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.chat = new Chat();
        this.chat.init();
        this.tips = new Tips();
        this.tips.init();

        this.bindEvents();

    }


    unload() {
        console.log("Unloading Chapter D");
        this.gameAudio.fadeOutMusic(2000);

        this.intervallHandler = new IntervalHandler();
        this.intervallHandler.clear();
    }
}

export default ChapterD;

