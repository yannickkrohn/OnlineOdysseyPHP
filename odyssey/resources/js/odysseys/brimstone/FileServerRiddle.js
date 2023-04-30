import Chat
    from "./Chat";
import GameController
    from "../../GameController";
import Synchronizer
    from "../../Synchronizer";

class FileServerRiddle {
    constructor() {
        this.duration = 5 * 60;
        this.startTimestamp = Math.floor(Date.now() / 1000);
        this.endTimestamp = this.startTimestamp + this.duration;
        this.chat = new Chat();
        this.gameController = new GameController();
        this.synchronizer = new Synchronizer();

        this.currentLayer = 1;
        this.clickPath = [];

        this.filesLayerOne = [{
            name: "1998",
            contents: [],
            id: "1998"
        },
            {
                name: "1997",
                contents: [],
                id: "1997"
            },
            {
                name: "1996",
                contents: [],
                id: "1996"
            },
            {
                name: "1995",
                contents: [],
                id: "1995"
            },
            {
                name: "1994",
                contents: [],
                id: "1994"
            }
        ];

        this.filesLayerTwo = [{
            name: "Körperverletzung",
            contents: [],
            id: "gk"
        },
            {
                name: "Diebstahl",
                contents: [],
                id: "d"
            },
            {
                name: "Betrug",
                contents: [],
                id: "b"
            },
            {
                name: "Beleidigung",
                contents: [],
                id: "u"
            },
            {
                name: "Sachbeschädigung",
                contents: [],
                id: "s"
            },
            {
                name: "Fälschung",
                contents: [],
                id: "g"
            }
        ];

        this.filesLayerThree = [{
            name: "Rechtshänder",
            contents: [],
            id: "rechts"
        },
            {
                name: "Linkshänder",
                contents: [],
                id: "links"
            }
        ];

        this.filesLayerFour = [{
            name: "Liebenwalde",
            contents: [],
            id: "liebenwalde"
        },
            {
                name: "Gransee",
                contents: [],
                id: "gransee"
            },
            {
                name: "Löwenberg",
                contents: [],
                id: "loewenberg"
            },
            {
                name: "Kremmen",
                contents: [],
                id: "kremmen"
            },
            {
                name: "Fehrbellin",
                contents: [],
                id: "fehrbellin"
            },
            {
                name: "Biesenthal",
                contents: [],
                id: "biesenthal"
            }
        ];

        this.renderFiles();

        var self = this;
        $(document).on("click", ".folder", function (){
            self.currentLayer++;
            self.clickPath.push($(this).data("id"));
            self.renderFiles();
        });
        $(document).on("click", ".directory-up", function (){
            self.currentLayer--;
            self.clickPath.pop();
            self.renderFiles();
        });
        $(document).on("click", ".download-files", function (){
            self.synchronizer.socket.emit('filesFound');
        });
    }

    renderFiles() {
        $('#folders').html("");

        if (this.currentLayer > 1){
            $('#folders').append("<div class='directory-up'>... Zurück</div>");
        }

        var files = [];
        console.log( this.clickPath);
        console.log( this.currentLayer);
        switch (this.currentLayer) {
            case 1:
                files = this.filesLayerOne;
                break;
            case 2:
                files = this.filesLayerTwo;
                break;
            case 3:
                files = this.filesLayerThree;
                break;
            case 4:
                files = this.filesLayerFour;
                break;
                case 5:
                   if ( this.clickPath.join('') === "1996gklinksloewenberg"){
                       $('#folders').append('<a href="#" class="download-files">Download</a>\n' +
                           '<ul class="target-files">\n' +
                           '    <li>\n' +
                           '        <i class="fa-solid fa-image"></i> DG002320323.jpg\n' +
                           '    </li> <li>\n' +
                           '        <i class="fa-solid fa-image"></i> DG60230329.jpg\n' +
                           '    </li> <li>\n' +
                           '        <i class="fa-solid fa-file"></i> tatort_bericht_loewenberg.doc\n' +
                           '    </li> <li>\n' +
                           '        <i class="fa-solid fa-image"></i> LG702320329.jpg\n' +
                           '    </li> <li>\n' +
                           '        <i class="fa-solid fa-image"></i> SG602320325.jpg\n' +
                           '    </li> <li>\n' +
                           '        <i class="fa-solid fa-image"></i> FG70232.jpg\n' +
                           '    </li>\n' +
                           '</ul>');
                   }else{
                       $('#folders').append("<div class='empty-dir'>Dieser Ordner ist leer</div>");
                   }
                break;
            default:
            // code block
        }


        $.each(files, function (index, value) {
            var folderHtml = '<div class="folder" data-id="' + value.id + '">';
            folderHtml += '<i class="fa-solid fa-folder"></i>';
            folderHtml += '<h1>' + value.name + '</h1>';
            folderHtml += '</div>';
            $('#folders').append(folderHtml);
        });
    }

    updateProgressBar() {
        var currentTimestamp = Date.now();
        var progress = 0;

        if (currentTimestamp >= this.gameController.gameData.fileServerEndTime) {
            progress = 0;
        } else {
            progress = (currentTimestamp - this.gameController.gameData.fileServerStartTime) / (this.gameController.gameData.fileServerEndTime - this.gameController.gameData.fileServerStartTime);
        }

        // Setze die Breite des Balkens entsprechend dem Fortschritt
        $('#fileserver-progress-bar').css('width', 100 - (progress * 100) + '%');
    }

    startUpdatingProgressBar() {
        // Setze updateProgressBar in einer Schleife auf, die alle 1000 Millisekunden ausgeführt wird
        this.intervalId = setInterval(this.updateProgressBar.bind(this), 1000);
    }

    stopUpdatingProgressBar() {
        // Beende die Schleife
        clearInterval(this.intervalId);
    }
}


export default FileServerRiddle;
