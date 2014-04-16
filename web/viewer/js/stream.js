var dest;
var lastTime = 0;
var fpsDiv = document.getElementById("fps");

function init() {
  dest = document.getElementById("video-image");
  dest.onload = reload_img;
  dest.onerror = error_img;
  reload_img();
}

function reload_img () {
  //dest.src = "http://lostlandmarks.local/cam_pic.php?time=" + new Date().getTime();
  dest.src = "http://lostlandmarks.local/cam.jpg?time=" + new Date().getTime();
  //dest.src = "http://lostlandmarks.local:8080/cam.jpg?time=" + new Date().getTime();
  var currentTime = Date.now();
  var delta = currentTime - lastTime;
  var fps = 1000 / delta;
  lastTime = currentTime;
  //document.getElementById("fps").innerHTML = Math.floor(fps)+"fps";
}

function error_img () {
  reload_img();
}