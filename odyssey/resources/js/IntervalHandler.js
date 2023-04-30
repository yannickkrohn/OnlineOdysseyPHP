
class IntervalHandler {

    static instance;

    constructor() {

        if (!IntervalHandler.instance) {
            IntervalHandler.instance = this;
        }
        this.intervals = [];
        this.timeouts = [];

        return IntervalHandler.instance;
    }
    setInterval(callback, interval) {
        const id = setInterval(callback, interval);
        this.intervals.push(id);
        return id;
    }

    setTimeout(callback, timeout) {
        const id = setTimeout(callback, timeout);
        this.timeouts.push(id);
        return id;
    }

    clearIntervals() {
        for (const id of this.intervals) {
            clearInterval(id);
        }
        this.intervals = [];
    }

    clearTimeouts() {
        for (const id of this.timeouts) {
            clearTimeout(id);
        }
        this.timeouts = [];
    }

    clear() {
       this.clearIntervals();
       this.clearTimeouts();
    }
}

export default IntervalHandler;

