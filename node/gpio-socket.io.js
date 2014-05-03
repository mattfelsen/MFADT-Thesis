// load GPIO
var gpio = require('onoff').Gpio;

// load socket.io
var io = require('socket.io-client');
var socket = io.connect('lostlandmarks.cc', { port: 9001, reconnect: false });
var connectionTimer = setInterval(socketReconnect, 5000);

// set up some I/O and states for GPIO
var button = new gpio(4, 'in', 'both');
var led = new gpio(17, 'out');
var state = false;
var lastState = true;

// set up socket.io event handlers
socket.on('connect', function (data) {
	console.log('[SOCK]', 'Connected');

	// clear reconnection timer
	// clearInterval(connectionTimer);
});
socket.on('message', function (data) {
	console.log('[SOCK]', data);
});
socket.on('disconnect', function () {
	console.log('[SOCK]', 'Disconnected');

	// set up reconnection timer
	// connectionTimer = setInterval(socketReconnect, 5000);
});

function socketReconnect() {
	console.log('[SOCK]', 'Checking connection...');
	if (socket.socket.connected == false) {
		console.log('[SOCK]', 'Not connected, attemping connection...');
		socket.socket.connect();
	}
}

var readPin = function() {
	state = button.readSync();

	// check if the lever button state changed
	// only check if it's false, meaning the circuit is closed
	// (the circuit uses a pull-down resistor so true == open && false == closed)
	if (state != lastState && state == false) {
		console.log('[GPIO]', 'Lever pressed! Sending event.');
		socket.emit('message', { event: 'transition' });
		led.writeSync(state);
	}

	lastState = state;
}

var exit = function() {
    button.unexport();
    led.unexport();
    process.exit();
}
process.on('SIGINT', exit);

console.log('[GPIO]', "Watching for changes...");
setInterval(readPin, 50);
