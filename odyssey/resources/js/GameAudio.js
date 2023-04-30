import Howler from 'howler';
import DronePilot
    from "./odysseys/brimstone/DronePilot";

class GameAudio {

    static instance;

    constructor() {

        if (!GameAudio.instance) {
            GameAudio.instance = this;
        }

        return GameAudio.instance;
    }

    init() {
        this.music = null;
        this.sound = null;

        this.bindVolumeControl();
    }

    playMusic(path) {
        // Stop the current track if it is playing
        if (this.music) {
            this.stopMusic();
        }

        // Create a new Howl object for the music
        this.music = new Howl({
            src: path,
            loop: true,
        });

        // Play the music
        this.music.play();
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music = null;
        }
    }

    fadeOutMusic(duration) {
        console.log(this.music);
        if (this.music) {
            this.music.fade(this.music.volume(), 0, duration);
        }
    }

    fadeInMusic(duration) {
        console.log(this.music);
        if (this.music) {
            this.music.fade(this.music.volume(), 0.4, duration);
        }
    }

    playSound(path) {
        // Create a new Howl object for the sound
        this.sound = new Howl({
            src: path,
        });
        this.sound.volume(0.5);

        // Play the sound
        this.sound.play();
    }

    bindVolumeControl() {
            // Update the music volume when the slider value changes
            $(document).on("input", "#volume-slider", (event) => {
                this.music.volume(event.target.value);
            });
    }
}

export default GameAudio;
