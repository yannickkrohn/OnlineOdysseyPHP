import GameController
    from "./GameController";
import MapRiddle
    from "./odysseys/brimstone/MapRiddle";
import PlayerClient
    from "./PlayerClient";

class Synchronizer {
    static instance;

    constructor() {

        if (!Synchronizer.instance) {
            Synchronizer.instance = this;
        }

        return Synchronizer.instance;
    }

    init() {

        this.gameController = new GameController();
        this.PlayerClient = new PlayerClient();

        // Connect to Socket.io server
        this.socket = io('http://192.168.178.40:3000', {query: 'id=' + this.gameController.gamePassId + '&clientId=' + this.PlayerClient.savefiles[this.gameController.gamePassId].PlayerClientId});


        this.socket.on('connect', () => {
            this.socket.emit('join', this.gameController.gamePassId);

            this.socket.emit('sendCommand', {
                command: 'handshake',
                id: this.gameController.gamePassId
            });
        });
        this.socket.on('ping', () => {
            console.log('received ping from server, sending pong');
            this.socket.emit('pong');
        });
        this.socket.on('gameDataUpdate', (update) => {
            console.log("gamedtaa update");
            console.log(update);
            Object.keys(update).forEach(key => {
                this.gameController.gameData[key] = update[key];
            });
            console.log( this.gameController.gameData);

        });
    }

}

export default Synchronizer;
