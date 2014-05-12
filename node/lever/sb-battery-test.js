var Spacebrew = require("spacebrew");

var server = "lostlandmarks.cc";
var name = "Battery Tester Script";
var description = "";
var sb = new Spacebrew.Client(server, name, description, { reconnect: true });

sb.addPublish("trigger", "boolean", "");
sb.connect();
sb.onOpen = sendRequest;

setInterval(sendRequest, 7 * 1000);


function sendRequest(){
  sb.send("trigger", "boolean", "true");
  console.log(new Date(), "Sending trigger...")
}