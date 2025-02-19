//Teodora Alexandrescu

let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let gameFont;
let bugs = [];
let bugCount = 16;
let speed = 3;
let bugSprite;
let squishedSprite;

function preload() {
  gameFont = loadFont("media/Jersey25-Regular.ttf");
  bugSprite = loadImage("media/spider.png");
  squishedSprite = loadImage("media/squished.png");
}

function setup() {
  createCanvas(1000, 600);
  textFont(gameFont);
  imageMode(CENTER);

  for (let i = 0; i < bugCount; i++) {
    bugs.push(new Bug(random(width), random(height), speed));
  }
}

function draw() {
  background(205,248,187);

  switch (gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      fill(242,14,161);
      textSize(50);
      text("Press ENTER to Start", width/2, height/2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      fill(187,36,4);
      textSize(35);
      text("Score: " + score, textPadding, textPadding);
      fill(187,36,4);
      textSize(35);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width-textPadding, textPadding);

      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }

      for (let i = bugs.length - 1; i >= 0; i--) {
        bugs[i].update();
        bugs[i].draw();

      if (bugs[i].isSquished && millis() - bugs[i].squishTime >= 1400) {
        bugs.splice(i, 1);
        speed += 0.7;
        bugs.push(new Bug(random(width), random(height), speed));
      }
    }
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      fill(251,8,229);
      textSize(50);
      text("Game Over!", width/2, height/2-50);
      text("Score: " + score, width/2, height/2);
      if (score > highScore) 
        highScore = score;
      text("High Score: " + highScore, width/2, height/2+50);
      break;
  }
}

function keyPressed() {
  switch (gameState) {
    case GameStates.START:
      if (keyCode === ENTER) {
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }
}

function mousePressed() {
  console.log("mouse pressed!");
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].squish();
  }
}

class Bug {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isSquished = false;
    this.size = 20;
    this.squishTime = 0; 
    this.movesHorizontal = random([true, false]); 
    this.direction = random([-1, 1]);
    this.animation = new SpriteAnimation(bugSprite, 0, 0, 6);
    this.currentAnimation = this.animation;
  }

  update() {
    if (!this.isSquished) {
      if (this.movesHorizontal) {
        this.x += this.direction * this.speed; 
      } else {
        this.y += this.direction * this.speed; 
      }
      if (this.x < -this.size) this.x = width + this.size;
      else if (this.x > width + this.size) this.x = -this.size;
      if (this.y < -this.size) this.y = height + this.size;
      else if (this.y > height + this.size) this.y = -this.size;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    if (this.movesHorizontal) {
      if (this.direction === 1) {
        rotate(HALF_PI);
      } else {
        rotate(-HALF_PI);
      }
    } else {
      if (this.direction === 1) {
        scale(1, -1);
      }
    }
    if (!this.isSquished) {
      this.currentAnimation.draw(0, 0);
    } else {
      let squishedSize = 3.5;
      image(squishedSprite, 0, 0, this.size *squishedSize, this.size *squishedSize);
    }
    pop();
  }

  squish() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size && !this.isSquished) {
      this.isSquished = true;
      this.squishTime = millis();
      score++
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.framecount = 0;
    this.flipped = false;
  }

  draw(x, y) {
    push();
    translate(x, y);
    let s = (this.flipped) ? -1 : 1;
    scale(s, 1); 
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);
    pop();

    this.framecount++;
    if (this.framecount % 8 === 0) {
      this.u++;
    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
      }
    }
  }
}

