var fs = require("fs");
// var request = require("request");
var http = require("http");


// var imageID = "MNY139792";
// var imageID = "MNY217061";
// var imageID = "MNY217045";
// var imageID = "MNY179338";

var imageID = process.argv[2];

var numTilesWidth = 0;
var numTilesHeight = 0;

var x = 0;
var y = 0;

fs.mkdir(imageID, function(err) {
	if (err) console.log(err);

	fetchNextImage();
});

function fetchNextImage() {

	if (numTilesHeight && y > numTilesHeight) {
		x++;
		y = 0;

		/*
		if (numTilesWidth && x > numTilesWidth) {
			return;
		} else {
			y = 0;
		}
		*/
	}

	var filename = x+"_"+y+"_1.jpeg";
	var url = "http://collections.mcny.org/Doc/MNY/TEMP/CACHE/MN1/zoomOL/"+imageID+"/" + filename;
	// console.log("Fetching", url);

	http.get(url, function(res) {
		// console.log(res);

		if (res.statusCode == 403 || res.statusCode == 404) {
			console.log("[EROR] [RQST]", "Got status", res.statusCode);
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
		} else if (res.statusCode == 200) {
			res.pipe(fs.createWriteStream(imageID+"/"+filename));
		}

		console.log(res.statusCode, "Done with", filename);

		y++;
		setTimeout(fetchNextImage, 200);
	}).on('error', function(err) {
		console.log("[EROR [RQST] " + err.message);
	});


}
