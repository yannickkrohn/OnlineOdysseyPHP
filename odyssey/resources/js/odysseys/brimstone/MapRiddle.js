import GameController
    from "../../GameController";
import Synchronizer
    from "../../Synchronizer";


require('jquery');

class MapRiddle {
    constructor() {
        this.img = new Image;
        this.img.src = '/assets/img/brimstone/phone_map.png';
        this.paint = false;
        this.colorRed = "#DC3333";
        this.colorBlue = "#3393DC";
        this.colorGreen = "#2DB93B";
        this.canvas = null;
        this.colorYellow = "#E8D317";
        this.strokes = [];
        this.currentColor = this.colorRed;
        this.gameController = new GameController();
        this.synchronizer = new Synchronizer();

        this.setupCanvas(() => {
            this.setupDrawingHandlers();
            this.setupToolsHandlers();
            this.redraw();
        });

        var self = this;

        $(".submit-riddle").on("click", function (e) {
            e.preventDefault();

            if (confirm("Achtung: Deine Eingabe kann nicht rückgängig gemacht werden und ist für alle Spieler bindend. Ihr habt nur einen Versuch. Möchtest du fortfahren?")) {
                self.synchronizer.socket.emit('validateCoordinates', {"coordinates": {"x": $('select[name="phone-coords-x"]').val(), "y": $('select[name="phone-coords-y"]').val()}});
            } else {
            }
        });
    }


    setupCanvas(callback) {
        console.log('---------------------------');
        this.img.onload = () => {
            console.log('img.width: ' + this.img.width);
            console.log('img.height: ' + this.img.height);
            console.log('wrapper width: ' + $('.map-drawing').width());
            var canvasDiv = document.getElementById('canvasDiv');
            var canvasWidth = $('.map-drawing').width();
            var canvasHeight = this.img.height * (canvasWidth / this.img.width);

            console.log('canvasWidth: ' + canvasWidth);
            console.log('canvasHeight: ' + canvasHeight);
            this.canvas = document.createElement('canvas');
            this.paint = false;
            this.canvas.setAttribute('width', canvasWidth);
            this.canvas.setAttribute('height', canvasHeight);
            this.canvas.setAttribute('id', 'canvas');
            canvasDiv.appendChild(this.canvas);
            if (typeof G_vmlCanvasManager != 'undefined') {
                this.canvas = G_vmlCanvasManager.initElement(this.canvas);
            }
            this.context = this.canvas.getContext("2d");
            callback();
        }
    }


    setupDrawingHandlers() {
        var self = this;
        $('#canvas').on('mousedown touchstart', function (e) {
            console.log('touchstart');
            console.log(e);

            // Get the position of the parent element
            var parentOffset = $(this).parent().offset();

            // Calculate the mouse position relative to the parent element
            var mouseX = e.pageX - parentOffset.left;
            var mouseY = e.pageY - parentOffset.top;
            console.log("paint start");

            self.paint = true;
            self.addClick(mouseX, mouseY, false);
            self.redraw();
        });
        $('#canvas').on('mousemove', function (e) {
            if (self.paint) {
                // Get the position of the parent element
                var parentOffset = $(this).parent().offset();

                // Calculate the mouse position relative to the parent element
                var mouseX = e.pageX - parentOffset.left;
                var mouseY = e.pageY - parentOffset.top;

                self.addClick(mouseX, mouseY, true);
                self.redraw();
            }
        });
        $('#canvas').on('touchmove', function (e) {
            console.log('touchmove');
            console.log(e);
            if (e.touches) {
                if (e.touches.length == 1) { // Only deal with one finger
                    var touch = e.touches[0]; // Get the information for finger #1

                    // Get the position of the parent element
                    var parentOffset = $(this).parent().offset();

                    // Calculate the touch position relative to the parent element
                    var touchX = touch.pageX - parentOffset.left;
                    var touchY = touch.pageY - parentOffset.top;

                    self.addClick(touchX, touchY, true);
                    self.redraw();
                }
            }
            e.preventDefault(); // avoid scrolling
        });
        $('#canvas').on('mouseup touchend mouseleave', function (e) {
            console.log("paint over");
            self.paint = false;
        });
    }

    addClick(x, y, dragging) {
        var stroke;
        if (dragging) {
            stroke = this.strokes[this.strokes.length - 1];
            stroke.coordinates.push({
                x: x,
                y: y
            });
        } else {
            stroke = {
                coordinates: [{
                    x: x,
                    y: y
                }],
                color: this.currentColor
            }
            this.strokes.push(stroke);

            console.log(this.strokes);
        }
    }

    redraw() {
        this.context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height); // Clears the canvas

        this.context.lineJoin = "round";
        this.context.lineWidth = 6;
        var self = this;
        $.each(this.strokes, function (k, s) {

            self.context.strokeStyle = s.color;
            self.context.beginPath();
            $.each(s.coordinates, function (kc, c) {

                if (kc === 0) {
                    self.context.moveTo(c.x, c.y);
                } else {
                    self.context.lineTo(c.x, c.y);
                }
            });
            console.log(self.context);

            self.context.stroke();

            console.log("Reached");
        });

    }

    setupToolsHandlers() {
        $('.color-red').click(() => {
            this.currentColor = this.colorRed;
        });
        $('.color-blue').click(() => {
            this.currentColor = this.colorBlue;
        });
        $('.color-green').click(() => {
            this.currentColor = this.colorGreen;
        });
        $('.color-yellow').click(() => {
            this.currentColor = this.colorYellow;
        });
        $('.clear-drawing').click(() => {
            this.clearDrawing();
        });
    }

    clearDrawing() {
        this.strokes = [];
        this.redraw();
    }

}

export default MapRiddle;

