PImage photo;

float overscale = 0.3;

void setup() {
  size(displayWidth, displayHeight);
  imageMode(CENTER);
  
  photo = loadImage("penn_station_construction.jpg");
  
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
  return true;
}

