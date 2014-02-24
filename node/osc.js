var osc = require("osc-min");
var dgram = require("dgram");
var udp = dgram.createSocket("udp4");

if (process.argv[2]) {
	var server = process.argv[2];
} else {
	var server = "mattfelsen.local";
}

if (process.argv[3])
    var outport = parseInt(process.argv[3]);
else
    outport = 12345

console.log("sending heartbeat messages to http://"+server+":" + outport);

var state = true;

var sendHeartbeat = function() {
  var buf;
  buf = osc.toBuffer({
    address: "/button",
    args: [ state ? 1 : 0 ]
  });
  state = !state;
  return udp.send(buf, 0, buf.length, outport, server);
};

setInterval(sendHeartbeat, 2000);
