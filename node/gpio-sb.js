// load GPIO
var gpio = require('onoff').Gpio;

// load Spacebrew
var Spacebrew = require("spacebrew");

var sb_server = "mattfelsen.local";
var sb_name = "Tower View Lever";
var sb_description = "Sends boolean event when the tower viewer lever is pressed";
var sb = new Spacebrew.Client(sb_server, sb_name, sb_description);

sb.addPublish("lever", "boolean", "Tower viewer lever");
sb.connect();


// set up some I/O and states for GPIO
var button = new gpio(4, 'in', 'both');
var led = new gpio(17, 'out');
var state = false;
var lastState = false;

var readPin = function() {
	state = button.readSync();

	if (state != lastState) {
		console.log('Button is now', state ? "true" : "false");
		sb.send("lever", "boolean", state ? "true" : "false");
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

console.log("Watching for changes...");
setInterval(readPin, 50);