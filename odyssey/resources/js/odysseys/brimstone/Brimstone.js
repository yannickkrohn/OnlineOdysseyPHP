
import ChapterA
    from "./ChapterA";
import ChapterB
    from "./ChapterB";
import Chat
    from "./Chat";
import GameController
    from "../../GameController";
import Synchronizer
    from "../../Synchronizer";
import ChapterC
    from "./ChapterC";
import ChapterD
    from "./ChapterD";
import ChapterE
    from "./ChapterE";
import ChapterF
    from "./ChapterF";



const Mustache = require('mustache');

class Brimstone {
    init(withCutscenes) {

        var chat = new Chat();

        this.gameController = new GameController();
        this.synchronizer = new Synchronizer();

        this.updateGameUIForChapter(withCutscenes);
        this.registerGameSynchronizers();
    }

    updateGameUIForChapter(playCutscene){
        if(typeof playCutscene === "undefined"){
            playCutscene = true;
        }

        if (this.gameController.currentChapter === "A") {
            var chapter = new ChapterA();
            chapter.load(playCutscene,() => {
                this.gameController.currentChapterObj = chapter;
                console.log( this.gameController.currentChapterObj );
                this.chapterLoaded();
            });
        } else if (this.gameController.currentChapter === "B") {
            var chapter = new ChapterB();
            chapter.load(playCutscene,() => {
                this.gameController.currentChapterObj = chapter;
                this.chapterLoaded();
            });
        } else if (this.gameController.currentChapter === "C") {
            var chapter = new ChapterC();
            chapter.load(playCutscene, () => {
                this.gameController.currentChapterObj = chapter;
                this.chapterLoaded();
            });
        }else if (this.gameController.currentChapter === "D") {
            var chapter = new ChapterD();
            chapter.load(playCutscene, () => {
                this.gameController.currentChapterObj = chapter;
                this.chapterLoaded();
            });
        }else if (this.gameController.currentChapter === "E") {
            var chapter = new ChapterE();
            chapter.load(playCutscene, () => {
                this.gameController.currentChapterObj = chapter;
                this.chapterLoaded();
            });
        }else if (this.gameController.currentChapter === "F") {
            var chapter = new ChapterF();
            chapter.load(playCutscene, () => {
                this.gameController.currentChapterObj = chapter;
                this.chapterLoaded();
            });
        }
    }

     preloadCutscenes(callback){

         var cutscenes = [
             {id:'intro', src : '/assets/video/odysseys/brimstone/intro.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-b', src : '/assets/video/odysseys/brimstone/cutscene-b.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-b-two', src : '/assets/video/odysseys/brimstone/cutscene-b-two.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-b-three', src : '/assets/video/odysseys/brimstone/cutscene-b-three.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-c-one', src : '/assets/video/odysseys/brimstone/cutscene-c-one.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-c-two', src : '/assets/video/odysseys/brimstone/cutscene-c-two.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-d', src : '/assets/video/odysseys/brimstone/cutscene-d.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-e', src : '/assets/video/odysseys/brimstone/cutscene-e.mp4',type : createjs.AbstractLoader.BINARY},
             {id:'cutscene-f', src : '/assets/video/odysseys/brimstone/cutscene-f.mp4',type : createjs.AbstractLoader.BINARY}
         ];


        // create queue
        var queue = new createjs.LoadQueue(true);
         queue.load();

        queue.on("complete", async ()=>{
            cutscenes.forEach(function (cutsceneElement) {


                // Insert Video
                var videosTarget = queue.getResult(cutsceneElement.id);
                console.log("intro vid");
                var $video = $('<video class="cutscene" id="'+cutsceneElement.id+'" />');
                var $source = $('<source type="video/mp4"/>');
                var src = videosTarget;

                var blob = new Blob( [ src ], { type: "video/mp4" } );

                var urlCreator = window.URL || window.webkitURL;
                var objUrl = urlCreator.createObjectURL(blob);
                $source.attr('src', objUrl);
                console.log(objUrl);

                $video.append($source);
                $('.cutscene-holder').append($video);
            });
            $('#loader').fadeOut(500, ()=>{
                callback();
            });
        }, this);

        // create manifest for files to load
        queue.loadManifest(cutscenes);

        // handle  & show progress
        queue.on("progress", function(evt){
            var p = queue.progress * 100;
            console.log(p);
            $(".loading-progress").css("width", p+"%");
        });
    }

    registerGameSynchronizers(){
        console.info("add Change Sync");
        console.log(this.synchronizer.socket);

        this.synchronizer.socket.on('chapterChange', data => {
            console.info("Chapter Change Sync");
            console.info(data);

            Object.keys(data.gameData).forEach(key => {
                this.gameController.gameData[key] = data.gameData[key];
            });

            console.log("Chapter change data");
            console.log(data.gameData);
            this.gameController.changeChapter(data.chapter);
        });
    }

    chapterLoaded() {
        const imageUrls = [
            '/assets/img/brimstone/wallpaper.jpg',
            '/assets/img/brimstone/wallpaper2.jpg'
        ];

        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const randomImageUrl = imageUrls[randomIndex];

        $(".desktop").css("backgroundImage", 'url(' + randomImageUrl + ')');
    }
}

export default Brimstone;

