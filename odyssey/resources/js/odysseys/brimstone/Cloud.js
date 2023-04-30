import GameAudio
    from "../../GameAudio";
import Synchronizer
    from "../../Synchronizer";

class Cloud {


    static instance;

    constructor() {
        if (!Cloud.instance) {
            Cloud.instance = this;
        }

        return Cloud.instance;
    }

    init(){
    this.synchronizer = new Synchronizer();
        $(".cloud-login-button").on("click", (e) => {
            e.preventDefault();
            this.synchronizer.socket.emit('validateCloudPassword', {"password": $('.cloud-password').val()});
        });
        $(".show-helper").on("click", (e) => {
            e.preventDefault();
            $(".merkhilfe").fadeIn();
        });

        this.synchronizer.socket.on('loginIncorrect', () => {
            $(".login-error").fadeIn();
        });
    }
}

export default Cloud;

