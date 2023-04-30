import Windows
    from "./Windows";
import MenuBar
    from "./MenuBar";
import Chat
    from "./Chat";
import FileServerRiddle
    from "./FileServerRiddle";
import Radio
    from "./Radio";

const Mustache = require('mustache');
import L
    from 'leaflet';
import 'leaflet/dist/leaflet.css';

class DronePilot {
    static instance;

    constructor() {

        if (!DronePilot.instance) {
            DronePilot.instance = this;
        }

        return DronePilot.instance;
    }


    // Generate a random value between 20 and 80
    getRandomValue() {
        return Math.floor(Math.random() * (80 - 20 + 1)) + 20;
    }

    initDroneMap() {
        this.battery = 100;
        this.lowBatteryWarning = false;
        this.droneArrived = false;
        console.log("init drone");

        // Initialize the map and set its view to the center of the city
        this.map = L.map('dronemap', {
            keyboard: false
        }).setView([52.8897230632782, 13.150664573099363], 19);
// Add a tile layer from OpenStreetMap
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        var icon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/215/215767.png',
            iconSize: [95, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        // Create the bounds of the rectangle
// Create the bounds of the rectangle
        var bounds = [[52.885272, 13.130333], [52.885118, 13.130774], [52.884815, 13.130527], [52.884981, 13.129920]];

// Add the rectangle to the map
        this.companyRect = L.rectangle(bounds, {
            fill: true,
            fillColor: 'red',
            color: "red",
            weight: 1,
            "fillOpacity": 1
        });

        this.companyRect.addTo(this.map);

// Add a marker to the this.map
        this.marker = L.marker([52.8897230632782, 13.150664573099363], {icon: icon}).addTo(this.map);

// Set the marker's initial speed and direction (in degrees)
        this.speed = 0.00002;
        this.direction = 0;

    }

// Define a function to move the marker based on its speed and direction
    moveMarker() {
        // Calculate the new position of the marker based on its speed and direction

        var latLng = this.marker.getLatLng();
        var newLat = latLng.lat + this.speed * Math.cos((this.direction / 180) * Math.PI);
        var newLng = latLng.lng + this.speed * Math.sin((this.direction / 180) * Math.PI);

        this.battery = this.battery - 0.05;
        if (!this.lowBatteryWarning && this.battery < 25){
            const message = new SpeechSynthesisUtterance(`Warning. Low Battery. Return. Return. Return.`);
            message.lang = 'en-US';
            message.rate = 1;
            speechSynthesis.speak(message);
            this.lowBatteryWarning = true;
        }
        $(".battery-status").css("width", this.battery + "%");

        // Update the marker's position
        this.marker.setLatLng([newLat, newLng]);

        // Center the this.map on the marker's new position
        this.map.setView([newLat, newLng]);

        if (this.companyRect.getBounds().contains(this.marker.getLatLng())) {
            this.speed = 0;

            if (!this.droneArrived) {
                this.chat.insertMessage("Die Drohne ist in Position.")
                $(".dropoff").css("display", "flex");
            }
            this.droneArrived = true;
        }

        // Keep moving the marker on a loop
        setTimeout(() => {
            this.moveMarker();
        }, 100);

    }


    setFlightHeight(height, speed = 1) {
        console.log("height");
        console.log(height);
        console.log(speed);
        const message = new SpeechSynthesisUtterance(`Sinking initiated.`);
        message.lang = 'en-US';
        message.rate = 1;
        speechSynthesis.speak(message);
        $(".dropoff").html("Drohne sinkt...");
        // Get the current flight height
        let currentHeight = parseInt($('.flight-height').text(), 10);

        // Calculate the difference between the current height and the target height
        const heightDifference = Math.abs(height - currentHeight);

        // Calculate the number of steps needed to animate the height change, rounding up to the nearest integer
        const steps = Math.ceil(heightDifference / speed);

        // Calculate the increment or decrement amount for each step
        const stepSize = (height - currentHeight) / steps;

        // Set a counter to keep track of the current step
        let step = 0;

        // Define a function to animate the height change
        const animateHeightChange = () => {
            // Increment or decrement the current height by the step size
            currentHeight += stepSize;

            // Round the current height to the nearest integer
            currentHeight = Math.round(currentHeight);

            // Update the .flight-height element with the new height
            $('.flight-height').text(currentHeight);

            if (currentHeight % 10 === 0) {
                const message = new SpeechSynthesisUtterance(`${currentHeight}.`);
                message.lang = 'en-US';
                message.rate = 1.8;
                speechSynthesis.speak(message);

            }
            // Increment the step counter
            step += 1;

            // If the step counter is less than the total number of steps, set a timeout to run the function again
            if (step < steps) {
                setTimeout(animateHeightChange, 1000 / speed);
            }else{
                const message = new SpeechSynthesisUtterance(`Target Flightheight reached.`);
                message.lang = 'en-US';
                message.rate = 1;
                speechSynthesis.speak(message);
                $('.flight-height').text(height);
                $(".dropoff").html("Paket abwerfen");
            }
        };

        // Run the animateHeightChange function to start the animation
        animateHeightChange();
    }


    init() {
        this.map = null;
        this.marker = null;
        this.speed = null;
        this.chat = new Chat();


        this.initDroneMap();
        // Update the span element with the random value every 2 seconds
        setInterval(() => {
            $('.signal-strength').text(this.getRandomValue());
        }, 2000);


        $(".start-drone").on("click", (e) => {
            e.preventDefault();
            $(".start-drone-wrapper").fadeOut();
            this.moveMarker();
        });
        $(".change-height").on("click", (e) => {
            e.preventDefault();
            this.setFlightHeight(parseInt($(".flight-height-input").val()), 2);
        });

        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 37) { // Left arrow key
                this.direction -= 10;
            } else if (event.keyCode == 39) { // Right arrow key
                this.direction += 10;
            }
        });
    }


}

export default DronePilot;

