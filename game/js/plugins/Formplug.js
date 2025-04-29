/*:
 * @target MZ
 * @plugindesc Allows users to give a thumbs up, down or Wiggle to Formbar and interact with Formbar API via socket.io-client.
 * @author Bryce Lynd
 * 
 * @command thumbsUp
 * @text Thumbs Up
 * @desc Sends a ThumbsUp
 * 
 * @command thumbsDown
 * @text Thumbs Down
 * @desc Sends a ThumbsDown
 * 
 * @command Wiggle
 * @text Wiggle
 * @desc Sends a Wiggle
 * 
 * @command opps
 * @text Opps
 * @desc Removes the user's vote
 * 
 * @param Formbar URL
 * @text Formbar URL
 * @desc The URL of the Formbar server.
 * @type text
 * @default https://formbeta.yorktechapps.com/
 * 
 * @param API Key
 * @text API Key
 * @desc The API key for Formbar.
 * @type text
 * @default 
 * 
 * @help
 * This plugin allows users to give a thumbs up, down or wiggle to Formbar.
 * 
 * Plugin Commands:
 *  Formplug thumbsUp
 *  Formplug thumbsDown
 *  Formplug Wiggle
 *  Formplug opps
 * 
 */

(() => {
    const parameters = PluginManager.parameters('Formplug');
    var FORMBAR_URL = parameters['Formbar URL'];
    var API_KEY = parameters['API Key'];
    // Check if Socket.IO is already loaded
    if (typeof io === "undefined") {
        let script = document.createElement("script");
        script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
        script.onload = function () {
            startSocketConnection(); // Call function to initialize socket after loading
        };
        document.head.appendChild(script);
    } else {
        startSocketConnection();
    }

    function startSocketConnection() {
        const socket = io(FORMBAR_URL, {
            extraHeaders: {
                api: API_KEY
            }
        });

        socket.on('connect', () => {
            console.log('Connected');
            socket.emit('getActiveClass');
        });

        socket.on('setClass', (classId) => {
            console.log(`The user is currently in the class with id ${classId}`);
        });

        socket.on('connect_error', (error) => {
            if (error.message == 'xhr poll error') {
                console.log('no connection');
            } else {
                console.log(error.message);
            }

            setTimeout(() => {
                socket.connect();
            }, 5000);
        });

        let classId = 0;
        socket.on('setClass', (userClass) => {
            classId = userClass;
        });

        socket.on('classEnded', () => {
            socket.emit('leave', classId);
            classId = '';
            socket.emit('getUserClass', { api: API_KEY });
        });

        socket.on('joinRoom', (classCode) => {
            if (classCode) {
                socket.emit('vbUpdate');
            }
        });

        socket.on('vbUpdate', (data) => {
            console.log(data);
        });

        PluginManager.registerCommand("Formplug", "thumbsUp", () => {
            socket.emit("pollResp", "Up")
        });
        PluginManager.registerCommand("Formplug", "thumbsDown", () => {
            socket.emit('pollResp', "Down");
        });
        PluginManager.registerCommand("Formplug", "Wiggle", () => {
            socket.emit('pollResp', 'Wiggle');
        });
        PluginManager.registerCommand("Formplug", "opps", () => {
            socket.emit('pollResp','opps');
        });
    }

})();