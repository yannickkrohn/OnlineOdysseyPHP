import Synchronizer
    from "./Synchronizer";
import Fingerprint2
    from "fingerprintjs2";
import GameController
    from "./GameController";
import Brimstone
    from "./odysseys/brimstone/Brimstone";

class PlayerClient {

    static instance;

    constructor() {
        if (!PlayerClient.instance) {
            PlayerClient.instance = this;
        }

        return PlayerClient.instance;
    }

    init() {
        // Check if the savefiles cookie exists, and if it does, parse the JSON string into an object
        const savefilesCookie = this.getCookie("savefiles");
        this.savefiles = savefilesCookie ? JSON.parse(savefilesCookie) : {};
        this.gameController = new GameController();
        this.clientId = null;
    }

    requestPlayerName() {
        return new Promise((resolve, reject) => {
            // Create the div element
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = 0;
            modal.style.left = 0;
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.className = "player-name-popup";

            // Create the label element
            const label = document.createElement('label');
            label.innerText = 'Gib deinen Namen ein:';

            // Create the input field
            const inputField = document.createElement('input');
            inputField.type = 'text';

            // Create the button element
            const button = document.createElement('button');
            button.innerText = 'Beitreten';
            button.addEventListener('click', () => {
                // Resolve the promise with the value of the input field
                resolve(inputField.value);
                document.body.removeChild(modal);
            });

            // Append the elements to the modal
            modal.appendChild(label);
            modal.appendChild(inputField);
            modal.appendChild(button);

            // Append the modal to the document body
            document.body.appendChild(modal);
        });
    }


    getClientIdentity(callback) {
        if (!this.hasSavefile(this.gameController.gamePassId)) {
            this.requestPlayerName().then((name) => {
                // If no savefile exists generate PlayerClient id and savefile
                this.generatePlayerClientId().then((id) => {
                    this.savefiles[this.gameController.gamePassId] = {
                        PlayerClientId: id,
                        PlayerClientName: name,
                        gameData: {},
                    };
                    this.setCookie("savefiles", JSON.stringify(this.savefiles), 365);
                    callback(this.savefiles[this.gameController.gamePassId]);
                });
            });
        } else {
            this.gameController.addStartupOverlay(() => {
                callback(this.savefiles[this.gameController.gamePassId]);
            });
        }
    }


    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    updateSavefile(gameData) {
        if (!this.hasSavefile(this.gameController.gamePassId)) {
            this.generatePlayerClientId().then((id) => {

                this.savefiles[this.gameController.gamePassId] = {
                    PlayerClientId: id,
                    gameData: {},
                };
            });
        }

        this.savefiles[this.gameController.gamePassId].gameData = gameData;

        // Set the savefiles cookie with the updated savefiles object
        this.setCookie("savefiles", JSON.stringify(this.savefiles), 365);
    }

    hasSavefile() {
        return this.savefiles[this.gameController.gamePassId] !== undefined;
    }

    generatePlayerClientId() {
        return new Promise((resolve, reject) => {
            // Get the current timestamp in milliseconds
            const timestamp = new Date().getTime();

            // Generate a random number between 1 and 1000000
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;

            // Return the combination of the timestamp and random number as the client ID
            resolve(`${timestamp}${randomNumber}`);
        });
    }
}

export default PlayerClient;
