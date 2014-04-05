var fs = require("fs");
var http = require("http");

var imageID = process.argv[2];
var imageID2 = process.argv[3];

var numTilesWidth = 0;
var numTilesHeight = 0;

var imageWidth = process.argv[4];
var imageHeight = process.argv[5];

var tileWidth = 512;
var tileHeight = 512;

var x = 0;
var y = 0;

fs.mkdir(imageID2, function(err) {
	if (err) console.log(err);

	fetchNextImage();
});

function fetchNextImage() {

	if (y * tileHeight > imageHeight) {
		x++;
		y = 0;

		if (x * tileWidth > imageWidth) {
			console.log("Reached end, finishing");
			return;
		}
	}

	var filename = x+"_"+y+"_1.jpeg";

	var url = "http://cdm16694.contentdm.oclc.org/utils/ajaxhelper/?";
	var options = {
		CISOROOT: imageID,
		CISOPTR: imageID2,
		action: 2,
		DMSCALE: 200,
		DMWIDTH: 512,
		DMHEIGHT: 512,
		DMX: x * tileWidth,
		DMY: y * tileHeight,
		//DMTEXT: "grand central",
		DMROTATE: 0

	}

	var options_array = [];
	for (key in options) {
		options_array.push(key + "=" + options[key]);
	}
	var options_string = options_array.join("&");
	url += options_string;
	
	console.log("Fetching", url);
	http.get(url, function(res) {
		// console.log(res);

		if (res.statusCode == 403 || res.statusCode == 404) {
			console.log("[EROR] [RQST]", "Got status", res.statusCode);
			/*
			if (numTilesHeight == 0) {
				console.log("[EROR] [SIZE]", "No max height, setting tiles height to", y);
				numTilesHeight = y - 1;
			} else if (numTilesHeight > 0) {
				console.log("Requested all photos, finishing.");
				numTilesWidth = x;
				return;
			}  else {
				console.log("[EROR] [SIZE]", "Something else!");
			}
			*/
		} else if (res.statusCode == 200) {
			res.pipe(fs.createWriteStream(imageID2+"/"+filename));
		}

		console.log(res.statusCode, "Done with", filename);
	
		y++;
		setTimeout(fetchNextImage, 200);
	}).on('error', function(err) {
		console.log("[EROR [RQST] " + err.message);
	});
	


}
