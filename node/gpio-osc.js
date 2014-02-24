// load GPIO
var gpio = require('onoff').Gpio;

// load OSC
var osc = require("osc-min");
var dgram = require("dgram");
var udp = dgram.createSocket("udp4");


// set up some I/O and states for GPIO
var button = new gpio(4, 'in', 'both');
var led = new gpio(17, 'out');
var state = false;
var lastState = false;

var readPin = function() {
	state = button.readSync();

	if (state != lastState) {
		console.log('Button is now', state);
		sendLeverChange(state);
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


// set up OSC reciever
var receiver = process.argv[2] || "mattfelsen.local";
var outport = parseInt(process.argv[3]) || 12345;
var oscState = true;

var sendHeartbeat = function() {
  var buf;
  buf = osc.toBuffer({
    address: "/button",
    args: [ state ? 1 : 0 ]
  });
  oscState = !oscState;
  return udp.send(buf, 0, buf.length, outport, receiver);
};

var sendLeverChange = function(lever) {
  var buf;
  buf = osc.toBuffer({
    address: "/lever",
    args: [ lever ? 1 : 0 ]
  });
  return udp.send(buf, 0, buf.length, outport, receiver);
};


console.log("Watching for changes...");
setInterval(readPin, 50);

// console.log("sending heartbeat messages to http://"+receiver+":" + outport);
// setInterval(sendHeartbeat, 2000);
