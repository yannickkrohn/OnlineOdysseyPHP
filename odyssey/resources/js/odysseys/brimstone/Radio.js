import GameAudio
    from "../../GameAudio";

class Radio {


    static instance;

    constructor() {
        if (!Radio.instance) {
            Radio.instance = this;
        }

        return Radio.instance;
    }

    init() {
        this.gameAudio = new GameAudio();


        this.playButton = document.getElementById('play-button');
        this.pauseButton = document.getElementById('pause-button');
        this.volumeSlider = document.getElementById('volume-slider');

        this.playButton.addEventListener('click', () => this.play());

    }

    radioTalk(){
        var radioTalk = new Audio("/assets/audio/odysseys/brimstone/radio-1.mp3");
        radioTalk.play();
        this.setVolume(0.3);
    }

    play() {
        this.gameAudio.playMusic("/assets/audio/odysseys/brimstone/chapter_a.mp3");
    }

    pause() {
        this.audio.pause();
    }

    setVolume(volume) {
        this.audio.volume = volume;
    }
}

export default Radio;

