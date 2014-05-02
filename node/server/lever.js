var io = require('socket.io-client');
var socket = io.connect('localhost', { port: 5555, reconnect: false });

var leverTimer;
var connectionTimer = setInterval(socketReconnect, 5000);

socket.on('connect', function (data) {
	console.log('connected');

	// clear reconnection timer
	//clearInterval(connectionTimer);

	leverTimer = setInterval(function(){
		console.log('sending lever');
		socket.emit('message', { event: 'lever' });
	}, 3000);

});

socket.on('message', function (data) {
	console.log(data);
});

socket.on('disconnect', function () {
	console.log('disconnected');
	clearInterval(leverTimer);

	// set up reconnection timer
	connectionTimer = setInterval(socketReconnect, 5000);
});

function socketReconnect() {
	console.log('checking connection...');
	if (socket.socket.connected == false) {
		console.log('not connected, attemping connection.');
		socket.socket.connect();
	}
}