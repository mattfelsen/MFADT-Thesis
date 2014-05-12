// load socket.io
var io = require('socket.io-client');
var socket = io.connect('lostlandmarks.cc', { port: 9001, reconnect: false });

var leverTimer;
var connectionTimer = setInterval(socketReconnect, 5000);


// set up socket.io event handlers
socket.on('connect', function (data) {
	console.log('[SOCK]', 'Connected');

	// set lever timer
	leverTimer = setInterval(sendRequest, 7 * 1000);
});

socket.on('message', function (data) {
	console.log('[SOCK]', data);
});

socket.on('disconnect', function () {
	console.log('[SOCK]', 'Disconnected');

	// clear lever
	clearInterval(leverTimer);
});


function socketReconnect() {
	console.log('[SOCK]', 'Checking connection...');
	if (socket.socket.connected == false) {
		console.log('[SOCK]', 'Not connected, attemping connection...');
		socket.socket.connect();
	}
}

function sendRequest(){
	console.log(new Date(), "Sending trigger...")
	socket.emit('message', { event: 'transition' });
}