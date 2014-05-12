var Spacebrew = require("spacebrew");

var server = "localhost";
var name = "Tower View Lever";
var description = "Sends boolean event when the tower viewer lever is pressed";
var sb = new Spacebrew.Client(server, name, description);

sb.addPublish("lever", "boolean", "Tower viewer lever");
sb.connect();

var state = false;

setInterval(function(){
  state = !state;
  sb.send("lever", "boolean", state);
}, 1000);