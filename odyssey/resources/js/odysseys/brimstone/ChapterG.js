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

const Mustache = require('mustache');


class ChapterC {
    static instance;

    constructor() {

        if (!ChapterC.instance) {
            ChapterC.instance = this;
        }

        return ChapterC.instance;
    }

    load(callback) {
        fetch('/templates/odysseys/brimstone/chapter_c.html')
            .then(response => response.text())
            .then(template => {

                document.querySelector('#game-wrapper').innerHTML = Mustache.render(template, {});
                this.chapterLoaded();
                callback();
            });
    }

    chapterLoaded() {

        this.windows = new Windows();
        this.menuBar = new MenuBar();
        this.menuBar.start();
        this.chat = new Chat();
        this.chat.init();
        this.vent = new VentLoader();


    }
}

export default ChapterC;

