var dest;
var lastTime = 0;
var fps = document.getElementById("fps");

function init() {
  dest = document.getElementById("video-image");
  dest.onload = reload_img;
  dest.onerror = error_img;
  reload_img();
}

function reload_img () {
  dest.src = "http://lostlandmarks.local/cam_pic.php?time=" + new Date().getTime();
  var currentTime = Date.now();
  var delta = currentTime - lastTime;
  var fps = 1000 / delta;
  lastTime = currentTime;
  if (fps) fps.innerHTML = Math.floor(fps)+"fps";
}

function error_img () {
  reload_img();
}