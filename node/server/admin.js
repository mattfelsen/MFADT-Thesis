var io = require('socket.io-client');
var socket = io.connect('localhost', { port: 9001 });

socket.on('connect', function (data) {
	console.log('connected');

	socket.emit('message', { event: "transition" })
	socket.emit('message', { event: "reload" })
	socket.emit('message', { event: "heading-offset", value: 230 })
	socket.emit('message', { event: "tilt-offset", value: 14 })
});

socket.on('message', function (data) {
	console.log(data);
});
socket.on('disconnect', function () {
	console.log('disconnected');
});