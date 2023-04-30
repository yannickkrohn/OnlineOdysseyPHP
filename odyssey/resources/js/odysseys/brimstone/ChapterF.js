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
import Tips
    from "../../Tips";
import Synchronizer
    from "../../Synchronizer";
import GameAudio
    from "../../GameAudio";
import IntervalHandler
    from "../../IntervalHandler";

const Mustache = require('mustache');


class ChapterF {
    static instance;

    constructor() {
        this.synchronizer = new Synchronizer();

        if (!ChapterF.instance) {
            ChapterF.instance = this;
        }

        return ChapterF.instance;
    }

    load(showCutscene, callback) {
        this.gameController = new GameController();
        this.client = new PlayerClient();
        this.isDronePilot = false;

        console.log("Load chapter F");
        this.gameController.getGameParticipants()
            .then((participants) => {
                    var playerIdToFlyDrone = this.gameController.pickElementWithSeed(participants, "dronePilot");
                    var playerId = this.client.savefiles[this.gameController.gamePassId].PlayerClientId;

                    if (playerIdToFlyDrone["participant_id"] === playerId) {
                        this.isDronePilot = true;

                        fetch('/templates/odysseys/brimstone/chapter_f.html')
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
                    } else {
                        fetch('/templates/odysseys/brimstone/chapter_g_2.html')
                            .then(response => response.text())
                            .then(template => {
                                document.querySelector('#game-wrapper').innerHTML = Mustache.render(template, {});
                                $(".drone-pilot").text(playerIdToFlyDrone["name"])

                                if (showCutscene) {
                                    this.showCutscene();
                                } else {
                                    this.chapterLoaded();
                                }
                                callback();
                            });
                    }


                }
            )
            .catch(error => console.error(error));

    }

    showCutscene() {
        console.log("Show cutscene F");
        var self = this;
        var video = $("#cutscene-f");

        video.fadeIn(500);

        video[0].play();
        video.on('ended', function () {
            $(this).fadeOut();
            self.chapterLoaded();
            self.synchronizer.socket.emit('cutSceneFFinished');

        });
    }
    chapterLoaded() {
        this.gameAudio = new GameAudio();
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_f.mp3");
        this.gameAudio.fadeInMusic(3000);

        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.chat = new Chat();
        this.chat.init();
        this.tips = new Tips();
        this.tips.init();

        if (this.isDronePilot){
            this.drone = new DronePilot();
            this.drone.init();
        }

    }



    unload() {
        console.log("Unloading Chapter F");
        this.gameAudio.fadeOutMusic(2000);

        this.intervallHandler = new IntervalHandler();
        this.intervallHandler.clear();
    }
}

export default ChapterF;

