//example 3 Teodora Alexandrescu

function setup() {
  createCanvas(300,150);
}

function draw() {
  background (0,0,0);
  noStroke();

  //pacman
  fill(253,255,75);
  arc(80,72,105,105,PI+QUARTER_PI,PI-QUARTER_PI);

  //ghost
  fill(248,54,24);
  arc(220,68,100,100,PI,0);
  rect(170.5,60,99,60);

 //eyes
  fill(255,255,255);
  circle(195,68,35);
  circle(245,68,35);

 //pupils
  fill(23,27,229);
  circle(195,68,21);
  circle(245,68,21);

  endShape();
}
