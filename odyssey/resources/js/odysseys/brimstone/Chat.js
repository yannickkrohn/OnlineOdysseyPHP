import GameController
    from "../../GameController";

require('jquery');
import 'jquery-ui/ui/widgets/draggable';
import GameAudio
    from "../../GameAudio";
import IntervalHandler
    from "../../IntervalHandler";
import ChapterD
    from "./ChapterD";


class Chat {

    static instance;

    constructor() {

        if (!Chat.instance) {
            Chat.instance = this;
        }

        return Chat.instance;
    }

    init() {
        console.log("init chat");
        this.$messages = $('.messages');
        this.d;
        this.h;
        this.m;
        this.i = 0;
        this.gameController = new GameController();
        this.gameAudio = new GameAudio();
        this.intervalHandler = new IntervalHandler();




        $('.chat').draggable({
            handle: '.chat-title',
            containment: ".desktop"
        });

        $('#close-chat').click(() => {
            $(".chat").hide();
            $("#chat").removeClass("active");
        });
        $('#chat').click(() => {
            $("#chat").addClass("active");
            $(".chat").show();
        });

        $(document).on("click", '.message-submit', () => {
            this.insertMessage();
        });

        $(window).on('keydown', (e) => {
            if (e.which == 13) {
                this.insertMessage();
                return false;
            }
        });


        if (this.gameController.currentChapter === "A") {
            this.initChapterAMessages();
        } else if (this.gameController.currentChapter === "B") {
            this.initChapterBMessages();
        } else if (this.gameController.currentChapter === "C") {
            this.initChapterCMessages();
        } else if (this.gameController.currentChapter === "D") {
            this.initChapterDMessages();
        }
    }

    updateScrollbar() {
        $(".messages").scrollTop($(".messages").height());

    }

    initChapterAMessages() {
        this.intervalHandler.setTimeout(() => {

            this.fakeMessage('Hier sind die Telefondaten des Anrufs. Damit solltet ihr den Standort ermitteln können, wenn ihr die Schnittmenge der Funkmasten bestimmt.<br /> <br />--------<br /> Anruf Funkzellenabfrage. Verbindungsstärke zu Funkmasten:<br />T1            <1% <br />' +
                'T2            <1% <br />' +
                'T3            25% <br />' +
                'T4            <1% <br />' +
                'T5            70% <br />' +
                'T6            2% <br />' +
                'T7            <1% <br />' +
                'T8            <1% <br />' +
                'T9            NOT FOUND');

            this.intervalHandler.setTimeout(() => {

                this.fakeMessage('Beeilt euch. Wir haben nicht viel Zeit, wenn Helios überleben soll.');
                this.intervalHandler.setTimeout(() => {

                    this.fakeMessage('<img class="msg-img" src="/assets/img/brimstone/fine.gif"/>');
                }, 20000);
            }, 60000);

        }, 3000);
        this.intervalHandler.setTimeout(() => {

            this.fakeMessage('Das hab ich zur Reichweite der Masten gefunden: <img class="msg-img" src="/assets/img/brimstone/mast-range.png"/>');
            this.intervalHandler.setTimeout(() => {

                if (this.gameController.difficulty === 1){
                    this.fakeMessage('Das könnte auch nützlich sein: <img class="msg-img" src="/assets/img/brimstone/map_riddle_notice.png"/>');
                }

            }, 12000);

        }, 15000);
    }

    initChapterBMessages() {
            this.fakeMessage('Ich verschaffe euch Zugang zum Asservaten Server. Einen Moment...');


            this.intervalHandler.setTimeout(() => {
                this.fakeMessage('Das muss jetzt schnell gehen. Findet die Akte, bevor man unsere Anwesenheit bemerkt. Ich suche parallel nach Anhaltspunkten, die  auf Helios Identität schließen lassen.');


                this.intervalHandler.setTimeout(() => {
                    this.fakeMessage('Sekunde...');
                    this.intervalHandler.setTimeout(() => {
                        this.fakeMessage('Ich weiß leider nicht, wie alt Helios ist, aber vielleicht hilft das.<br /><br />' +
                            'Eros ist 23 und so viel jünger als Helios, wie Hybris älter als Lites<br />' +
                            'Als Helios der Initiative beigetreten ist, war Lites gerade 25.<br />' +
                            'Eros und Hybris sind 8 Jahre auseinander.<br />' +
                            'Helios ist seit 4 Jahren bei der Initiative.');
                        this.intervalHandler.setTimeout(() => {
                                this.fakeMessage('Das habe ich auch gefunden: <img class="msg-img" src="/assets/img/brimstone/snap.png"/>');
                        }, 12000);
                    }, 10000);
                }, 4000);
            }, 24000);

    }

    initChapterCMessages() {
        this.intervalHandler.setTimeout(() => {

            this.fakeMessage('In Helios persönlichen Gegenständen, müsste etwas dabei sein, dass auf sein Passwort schließen lässt.');

            this.intervalHandler.setTimeout(() => {

               // this.fakeMessage('');
                this.intervalHandler.setTimeout(() => {
                   // this.fakeMessage('Der Akku ist knapp, also auf direktem Wege dort hin 😉<br />');
                }, 30000);
            }, 2000);

        }, 3000);
    }

    initChapterDMessages() {
        var chapter = new ChapterD();

            this.fakeMessage('Die Zielperson heißt Michael Schnettke');
            this.intervalHandler.setTimeout(() => {
                this.fakeMessage('Durchsucht Soziale Netzwerke nach allem was hilft um seine Sicherheitsfragen zu beantworten');
            }, 4000);
    }

    initChapterEMessages() {
        var chapter = new ChapterD();

        if (chapter.isDronePilot){
            this.fakeMessage('Fliege die Drohne in das rot markierte Gebiet. Der Akku ist aber sehr begrenzt, daher solltest du erst starten wenn ihr die korrekte Abwurfhöhe berechnet habt.');
        }else{
            this.fakeMessage('Wir müssen die korrekte Abwurfhöhe für die Drohne berechnen. Dazu brauchen wir die Baupläne der Novacon Zentrale.');
            this.intervalHandler.setTimeout(() => {
                this.fakeMessage('Ich konnte den Architekten ausfindig machen. Wenn wir seinen Fileserver hacken, finden wir dort vielleicht, was wir suchen.');

                this.intervalHandler.setTimeout(() => {
                    this.fakeMessage('<a target="_blank" href="https://firecastlearchitecture.jimdosite.com/">https://firecastlearchitecture.jimdosite.com/</a>');
                }, 5000);
            }, 4000);
        }
    }

    setDate() {
        this.d = new Date();
        if (this.m != this.d.getMinutes()) {
            this.m = this.d.getMinutes();
            $('<div class="timestamp">' + this.d.getHours() + ':' + this.m + '</div>').appendTo($('.message:last'));
        }
    }

    insertMessage(msg) {

        if (typeof msg === "undefined"){
            var msg = $('.message-input').val();
        }
        console.log("mshg");
        console.log(msg);
        if ($.trim(msg) == '') {
            return false;
        }
        $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages')).addClass('new');
        this.setDate();
        $('.message-input').val(null);
        this.updateScrollbar();
        console.log("weffwe");
        this.intervalHandler.setTimeout(() => {
            if (msg === "Download abgeschlossen. Wir haben die Akte!"){
                this.fakeMessage("Sehr gut. Breche die Verbindung nun ab.");
                this.intervalHandler.setTimeout(()=>{
                    $(".window").hide();
                },5000);
            }else  if (msg === "Die Drohne ist in Position."){
                this.fakeMessage("Verstanden. Wie steht es um die Abwurfhöhe? Der Akku hält nicht mehr lange.");
            }else{
                this.fakeMessage();
            }

        }, 1000 + (Math.random() * 20) * 100);
    }

    fakeMessage(message) {

        this.updateScrollbar();

        if (typeof message === "undefined") {
            message = 'dafür ist jetzt keine Zeit.findet helius';
        }


        $('<div class="message loading new"><figure class="avatar"><img src="/assets/img/brimstone/nemisis-pp.png" /></figure><span></span></div>').appendTo($('.messages'));
        this.intervalHandler.setTimeout(() => {
            $(".chat").css("display", "flex");
            $("#chat").addClass("active");
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src="/assets/img/brimstone/nemisis-pp.png" /></figure>' + message + '</div>').appendTo($('.messages')).addClass('new');
            this.setDate();
            this.intervalHandler.setTimeout(() => {
                this.updateScrollbar();
            }, 200);
            this.i++;

            this.gameAudio.playSound('/assets/audio/odysseys/brimstone/message.mp3');

        }, 1000 + (Math.random() * 20) * 100);
    }
}


export default Chat;

