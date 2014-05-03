var io = require('socket.io-client');
var socket = io.connect('localhost', { port: 9001 });


socket.on('connect', function (data) {
	console.log('connected');
});

socket.on('message', function (data) {
	console.log(data);

	if (data.event == "transition") {
		console.log("transitioning...");
	}
	if (data.event == "reload") {
		console.log("reloading page");
	}
	if (data.event == "heading-offset") {
		console.log("heading offset", data.value)
	}
	if (data.event == "tilt-offset") {
		console.log("tilt offset", data.value)
	}
});

socket.on('disconnect', function () {
	console.log('disconnected');
});