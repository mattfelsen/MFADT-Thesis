$(window).on("load", setup);

var disconnectColor = "#F0A0A0";

/**
 * setup Configure spacebrew connection and adds the mousedown listener.
 */
function setup (){

	$('body').css('background-color', disconnectColor);

	// load socket.io
	var socket = io.connect(window.location.hostname, { port: 9001, reconnect: false });
	var connectionTimer = setInterval(socketReconnect, 5000);

	// set up socket.io event handlers
	socket.on('connect', function (data) {
		console.log('[SOCK]', 'Connected');
		$('body').css('background-color', 'white');
	});
	socket.on('disconnect', function () {
		console.log('[SOCK]', 'Disconnected');
		$('body').css('background-color', disconnectColor);
	});
	socket.on('message', function (data) {
		// console.log('[SOCK]', data);
	});

	// listen to the mouse 
	$("button").on("mousedown", onButtonPress);
	$("input[type='range']").on("change", onRangePress);
	$("input[type='text']").keyup(onContentChange);

	function socketReconnect() {
		// console.log('[SOCK]', 'Checking connection...');
		if (socket.socket.connected == false) {
			console.log('[SOCK]', 'Not connected, attemping connection...');
			socket.socket.connect();
		}
	}

	function onButtonPress (){
		if (!$(this).hasClass('change-content')) {
			socket.emit('message', { event: $(this).attr("id") });
		} else {
			socket.emit('message', { event: 'change-content', value: $(this).attr("data-content") });
		}
	}

	function onRangePress() {
		socket.emit('message', { event: $(this).attr("id"), value: $(this).val() });
	}

	function onContentChange(e) {
		if (e.keyCode != 13) return;

		socket.emit('message', { event: $(this).attr("id"), value: $(this).val() });
		$(this).val('');
	}

}
