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

	child = exec('omxplayer ' + queue[index], function (error, stdout, stderr) {
	    // console.log('stdout: ' + stdout);
	    // console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	    
	    index++;
	    if (index > queue.length - 1) {
		    index = 0;
	    }

	    nextVideo();
	});
}


nextVideo();
