//example 4 Teodora Alexandrescu

function setup() {
  createCanvas(300,300);
}

function draw() {
  background(9,46,194);
  stroke (255,255,255);
  strokeWeight(4);

//circle
  fill(48,181,6);
  circle(148,135,150);

//star
  fill(246,39,11);
  beginShape();
  vertex(148,60);  
  vertex(169,111); 
  vertex(222,111); 
  vertex(178,144); 
  vertex(192,197); 
  vertex(148,172); 
  vertex(104,197); 
  vertex(118,144);
  vertex(74,111);  
  vertex(127,111); 
  endShape(CLOSE);
}
