import spacebrew.*;

String server = "localhost";
String name = "Tower View Tablet";
String description = "String sending prototype for changing images";
Spacebrew sb;

PImage photo;

float overscale = 1;

void setup() {
  size(displayWidth, displayHeight);
  imageMode(CENTER);

  sb = new Spacebrew(this);
  sb.addSubscribe("filename", "string");
  sb.connect(server, name, description);

  loadViewerImage("penn_station_construction.jpg");
}

void onStringMessage(String name, String value) {
  if (name.equals("filename")) {
    loadViewerImage(value);
  }
}

void loadViewerImage(String filename) {
  photo = loadImage(filename);

  float imageNewWidth = width * (1 + overscale);
  float imageNewHeight = height * (1 + overscale);

  photo.resize((int) imageNewWidth, (int) imageNewHeight);
}

void draw() {
  background(127);

  pushMatrix();
  {
    translate(-mouseX+width/2, -mouseY+height/2);

    image(photo, width/2, height/2);
    //image(photo, 0, 0); //, 2000, 1593);
  }
  popMatrix();
}

boolean sketchFullScreen() {
  return false;
}

