import GameController
    from "./GameController";
import ChapterA
    from "./odysseys/brimstone/ChapterA";
import Synchronizer
    from "./Synchronizer";
import PlayerClient
    from "./PlayerClient";
import GameAudio
    from "./GameAudio";
import Brimstone
    from "./odysseys/brimstone/Brimstone";

console.log("Lobby");
const Mustache = require('mustache');

export class Lobby {

    getGameParticipants() {
        const gameId = this.gameController.gamePassId;
        return new Promise((resolve, reject) => {
            fetch(`/api/game-participants/${gameId}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    renderParticipants(participants) {
        let html = '';
        const participantsElement = $(".participants");

        for (const participant of participants) {
            html += `<li>${participant.name}</li>`;
        }
        participantsElement.html(html);
    }


    reloadGameParticipants() {

        this.getGameParticipants()
            .then((participants) => {
                    console.log("participants");
                    console.log(participants.data);
                    this.renderParticipants(participants.data);
                }
            )
            .catch(error => console.error(error));
    }

    init(gamePassId) {
        this.gameController = new GameController();
        this.PlayerClient = new PlayerClient();
        this.synchronizer = new Synchronizer();
        this.gameAudio = new GameAudio();

        this.synchronizer.socket.emit("registerAsParticipant", {
            "clientId": this.PlayerClient.savefiles[this.gameController.gamePassId].PlayerClientId,
            "clientName": this.PlayerClient.savefiles[this.gameController.gamePassId].PlayerClientName
        });

        this.synchronizer.socket.on('refreshPlayerList', data => {
            console.info("New Client connected");
            this.reloadGameParticipants();
        });

        this.synchronizer.socket.on("startOdyssey", data => {
            $("#loading-screen").fadeIn(3000);
            $(".page-content").addClass("blur-content");
            this.gameAudio.fadeOutMusic(5000);
            this.gameController.startOdyssey();
        });


        this.synchronizer.socket.on('newPlayer', data => {
            console.info("New Client connected");
            this.gameAudio.playSound("/assets/audio/lobby_join.wav");
        });

        $(document).on("click", ".start-odyssey", () => {

            $.ajax({
                url: '/api/gamepasses/' + this.gameController.gamePassId,
                method: 'PUT',
                data: {
                    status: 2
                },
                headers: {
                    'Authorization': 'Bearer '+window.apiToken
                },
                success: ()=> {

                    this.synchronizer.socket.emit("sendCommand", {"command": "odysseyWasStarted"});
                },
                error: (error)=> {
                    console.error(error);
                }
            });
        });

        fetch('/templates/lobby.html')
            .then(response => response.text())
            .then(template => {
                // Render the template with the data
                const output = Mustache.render(template, {});

                // Insert the rendered template into the page
                document.querySelector('#game-wrapper').innerHTML = output;

                this.reloadGameParticipants();
                this.playLobbyMusic();
                this.bindPreparationSugesstionsSlider();

                if (window.gameOwner){
                    $(".start-odyssey").show();
                }
            });
    }


    bindPreparationSugesstionsSlider() {
        this.preparationSugesstionsSliderElement = $(".lobby-prepare-steps ul");
        this.items = this.preparationSugesstionsSliderElement.find('li');
        this.currentItem = 0;
        this.items.eq(0).fadeIn(500);


        setInterval(() => {
            const current = this.items.eq(this.currentItem);
            const next = this.items.eq((this.currentItem + 1) % this.items.length);

            current.fadeOut(500, () => {
                this.currentItem = (this.currentItem + 1) % this.items.length;
                next.fadeIn(500);
            });
        }, 5000);
    }

    playLobbyMusic() {
        const audio = new Audio();
        const songs = ['/assets/audio/lobby3.mp3', '/assets/audio/lobby1.mp3'];
        let currentSong = 0;

        this.gameAudio.playMusic(songs[currentSong]);


        audio.addEventListener('ended', () => {
            currentSong = (currentSong + 1) % songs.length;
            this.gameAudio.playMusic(songs[currentSong]);
        });
    }

}

export default Lobby;
