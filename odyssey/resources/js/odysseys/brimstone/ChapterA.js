import MapRiddle
    from "./MapRiddle";
import Windows
    from "./Windows";
import MenuBar
    from "./MenuBar";
import Chat
    from "./Chat";
import Radio
    from "./Radio";
import GameAudio
    from "../../GameAudio";
import IntervalHandler
    from "../../IntervalHandler";
import Synchronizer
    from "../../Synchronizer";
import Tips
    from "../../Tips";

const Mustache = require('mustache');

class ChapterA {

    static instance;

    constructor() {

        if (!ChapterA.instance) {
            ChapterA.instance = this;
        }

        return ChapterA.instance;
    }

    load(showCutscene, callback) {
        fetch('/templates/odysseys/brimstone/chapter_a.html')
            .then(response => response.text())
            .then(template => {

                // Insert the rendered template into the page
                document.querySelector('#game-wrapper').innerHTML = Mustache.render(template, {});
                if (showCutscene){
                    this.showCutscene();
                }else{
                    this.chapterLoaded();
                }
                callback();
            });
    }

    chapterLoaded() {
        this.synchronizer = new Synchronizer();

        this.gameAudio = new GameAudio();
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_a.mp3");
        this.gameAudio.fadeInMusic(3000);


        this.chat = new Chat();
        this.chat.init();
        this.map = new MapRiddle();
        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.tips = new Tips();
        this.tips.init();
        this.synchronizer.socket.emit('cutSceneAFinished');
    }

    showCutscene() {
        var self = this;
        var video = $("#intro");
        video.fadeIn(500);

        video[0].play();
        video.on('ended', function () {
            $(this).fadeOut();
            self.chapterLoaded();
            self.synchronizer.socket.emit('cutSceneAFinished');
        });
    }

    unload() {
        console.log("Unloading Chapter A");
        this.gameAudio.fadeOutMusic(2000);

        this.intervallHandler = new IntervalHandler();
        this.intervallHandler.clear();

        //var radio = new Radio();
    //    radio.pause();
    }
}

export default ChapterA;

