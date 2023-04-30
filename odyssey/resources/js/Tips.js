import GameController
    from "./GameController";
import MapRiddle
    from "./odysseys/brimstone/MapRiddle";
import PlayerClient
    from "./PlayerClient";
import Synchronizer
    from "./Synchronizer";
import Chat
    from "./odysseys/brimstone/Chat";

const Mustache = require('mustache');

class Tips {
    static instance;
    static synth = window.speechSynthesis;
    static tips = [
        {
            tip: "Erster Hinweis",
            id: "first",
            available: true
        }, {
            tip: "Zweiter Hinweis",
            id: "second",
            available: true
        }, {
            tip: "Dritter Hinweis",
            id: "third",
            available: true
        }, {
            tip: "Lösung",
            id: "solution",
            available: true
        },
    ]

    constructor() {

        if (!Tips.instance) {
            Tips.instance = this;
        }

        return Tips.instance;
    }

    init() {

        this.gameController = new GameController();
        this.PlayerClient = new PlayerClient();
        this.synchronizer = new Synchronizer();
        this.chat = new Chat();

        this.loadTips();

        var self = this;
        $(document).on("click", ".use-tip", function() {
            self.synchronizer.socket.emit('requestTip', {"chapter": self.gameController.currentChapter, "id": $(this).attr("data-tip")});
            $(".game-controller .icon").trigger("click")
        });


        this.synchronizer.socket.on('tipReceived', data => {
            console.info("Tip received");
            console.info(data);

            this.chat.fakeMessage(data)

            const text = "Ein Mitspieler hat einen Hinweis angefordert. Der Hinweis lautet: " + data;

            const utterance = new SpeechSynthesisUtterance(text);

            Tips.synth.speak(utterance);
        });
    }

    loadTips() {
        this.renderTips()
    }

    renderTips() {
        fetch('/templates/tips.html')
            .then(response => response.text())
            .then(template => {

                var rendered = Mustache.render(template, {tips: Tips.tips});
                document.querySelector('#tips-wrapper').innerHTML = rendered;

                $(".game-controller").fadeIn();
            });
    }

}

export default Tips;
