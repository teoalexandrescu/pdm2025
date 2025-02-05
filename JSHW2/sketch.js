//Teodora Alexandrescu
let brushColor;

function setup() {
  createCanvas(1500,520);
  brushColor = color(250,154,229);
}

function draw() {
  noStroke();
  fill(249,82,77);
  square(4,4,40);
  fill(41,81,179);
  square(4,47,40);
  fill(248,182,46);
  square(4,90,40);
  fill(252,251,10);
  square(4,133,40);
  fill(202,17,210);
  square(4,176,40);
  fill(55,39,3);
  square(4,219,40);
  fill(238,56,123);
  square(4,262,40);
  fill(148,223,33);
  square(4,305,40);
  fill(52,229,242);
  square(4,348,40);
  fill(255,255,255);
  square(4,391,40);
  fill(0,0,0);
  square(4,434,40);
  fill(190,4,4);
  square(4,477,40);
}

function mousePressed(){
  console.log("mouse pressed!");
    if(mouseX >= 4 && mouseX <= 4+40) {
      if (mouseY >= 4 && mouseY <= 4+40){
        brushColor = color (249,82,77);
    }else if (mouseY >= 47 && mouseY <= 47+40) {
        brushColor = color (41,81,179);
    }else if (mouseY >= 90 && mouseY <= 90+40) {
        brushColor = color (248,182,46);
    }else if (mouseY >= 133 && mouseY <= 133+40) {
        brushColor = color (252,251,10);
    }else if (mouseY >= 176 && mouseY <= 176+40) {
        brushColor = color (202,17,210);
    }else if (mouseY >= 219 && mouseY <= 219+40) {
        brushColor = color (55,39,3);
    }else if (mouseY >= 262 && mouseY <= 262+40) {
        brushColor = color (238,56,123);
    }else if (mouseY >= 305 && mouseY <= 305+40) {
        brushColor = color (148,223,33);
    }else if (mouseY >= 348 && mouseY <= 348+40) {
        brushColor = color (52,229,242);
    }else if (mouseY >= 391 && mouseY <= 391+40) {
        brushColor = color (255,255,255);
    }else if (mouseY >= 434 && mouseY <= 434+40) {
        brushColor = color (0,0,0);
    }else if (mouseY >= 477 && mouseY <= 477+40) {
        brushColor = color (190,4,4);
    }
  }
}

function mouseDragged() {
  if (mouseX > 53) {
  strokeWeight(12); 
  stroke(brushColor);
  line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

