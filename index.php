<script src="http://localhost:3000/socket.io/socket.io.js"></script>

<button id="play-intro-button">Play Intro</button>
<button id="change-color">Change color</button>
<script>
    // Connect to Socket.io server
    const socket = io(':3000', {query: 'id=<?php echo $_GET["id"]; ?>'});

    // Get the "id" parameter from the URL query string
    const id = new URLSearchParams(window.location.search).get('id');
console.log(id);
    // Connect to the Socket.IO server
    socket.on('connect', () => {
        // Join the group with the specified "id"
        socket.emit('join', id);

        // Send a command to all users in the group
        socket.emit('sendCommand', {command: 'start', id: id});
    });

    socket.on('commandReceived', command => {
        console.log(command);
        if (command === 'playIntro') {
            // Play the intro sound
            playIntroSound();
        }
        if (command === 'colorChange') {
            console.log("color");
            // Play the intro sound
            document.body.style.backgroundColor = "red";
        }
    });

    // Add a click event listener to the button
    document.getElementById('play-intro-button').addEventListener('click', () => {
        // Send the "playIntro" command to all users in the group
        socket.emit('sendCommand', {command: 'playIntro', id: id});
    });

    // Add a click event listener to the button
    document.getElementById('change-color').addEventListener('click', () => {
        // Send the "playIntro" command to all users in the group
        socket.emit('sendCommand', {command: 'colorChange', id: id});
    });

    function playIntroSound() {
        const audioURL = 'intro.mp3'; // Replace this with the URL of your audio file

        // Create an HTML audio element
        const audioElement = new Audio(audioURL);

        // Play the audio file
        audioElement.play();
    }

</script>