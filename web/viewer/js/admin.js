$(window).on("load", setup);
	      
// Spacebrew Object
var sb, app_name = "Mobile Admin";

var disconnectColor = "#F0A0A0";

/**
 * setup Configure spacebrew connection and adds the mousedown listener.
 */
function setup (){

	$('body').css('background-color', disconnectColor);

	// create spacebrew client object
	sb = new Spacebrew.Client("lostlandmarks.cc", { reconnect: true });

	// set the base description
	sb.name(app_name);
	sb.description("");

	// configure the publication and subscription feeds
	sb.addPublish("transition", "boolean", "");
	sb.addPublish("reload", "boolean", "");
	sb.addPublish("slideshow", "boolean", "");
	sb.addPublish("filename", "string", "");
	sb.addPublish("heading-offset", "range", "");

	// override Spacebrew events - this is how you catch events coming from Spacebrew
	sb.onOpen = onOpen;
	sb.onClose = onClose;

	// connect to spacbrew
	sb.connect();

	// listen to the mouse 
	$("button").on("mousedown", onButtonPress);
	$("input[type='range']").on("change", onRangePress);
	$("input[type='text']").on("keyup", onStringPress);
}	

/**
 * Function that is called when Spacebrew connection is established
 */
function onOpen() {
	$('body').css('background-color', 'white');
}

/**
 * Function that is called when Spacebrew connection is closed
 */
function onClose() {
	$('body').css('background-color', disconnectColor);
}

/**
 * Function that is called whenever the button is pressed.  
 * @param  {Event object} evt Holds information about the button press event
 */
function onButtonPress (){
    // console.log("[onButtonPress] " + $(this).attr("id")); 
    sb.send($(this).attr("id"), "boolean", "true");
}

function onRangePress() {
	sb.send("heading-offset", "range", $(this).val());
}

function onStringPress(evt) {
	if (evt.keyCode == 13) {
		sb.send("filename", "string", $(this).val());
	}
}