var io = require('socket.io-client');
var socket = io.connect('localhost', { port: 9001, reconnect: false });

var connectionTimer = setInterval(socketReconnect, 5000);

var exec = require('child_process').exec;
var child;

var queue = [
	'armory.mov',
	'doc-video.mov',
	'grand-central.mov',
	'doc-video.mov',
];
var index = 0;

var nextVideo = function() {
	console.log("Playing", queue[index]);

	if (queue[index].indexOf('doc-video') == -1) {
		socket.emit('message', { event: 'change-content', value: queue[index].split('.')[0] });
	}

	child = exec('omxplayer ' + queue[index], function (error, stdout, stderr) {
	    // console.log('stdout: ' + stdout);
	    // console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	    
	    index = ++index % queue.length;

	    nextVideo();
	});
}

nextVideo();


socket.on('connect', function (data) {
	console.log('connected');

	// clear reconnection timer
	//clearInterval(connectionTimer);
});

socket.on('message', function (data) {
	console.log(data);
});

socket.on('disconnect', function () {
	console.log('disconnected');

	// set up reconnection timer
	// connectionTimer = setInterval(socketReconnect, 5000);
});

function socketReconnect() {
	// console.log('checking connection...');
	if (socket.socket.connected == false) {
		console.log('not connected, attemping connection.');
		socket.socket.connect();
	}
}