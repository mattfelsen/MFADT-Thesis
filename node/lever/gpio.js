var gpio = require('onoff').Gpio;
var button = new gpio(4, 'in', 'both');
var led = new gpio(17, 'out');

var state = false;
var lastState = false;

function readPin() {
	state = button.readSync();
	if (state != lastState) {
		console.log('Button is now', state);
	}
	lastState = state;
	led.writeSync(state);

}

function exit() {
    button.unexport();
    led.unexport();
    process.exit();
}

setInterval(readPin, 50);
process.on('SIGINT', exit);

console.log("Watching for changes...");