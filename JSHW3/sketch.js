//Teodora Alexandrescu
let cyclops;
let green;
let spelunky;
let robot;
let eskimo;
let character, character2, character3, charcter4 , character5;

function preload() {
  cyclops = loadImage("media/cyclops.png"); 
  green = loadImage("media/green.png"); 
  spelunky = loadImage("media/spelunky.png"); 
  robot = loadImage("media/robot.png"); 
  eskimo = loadImage("media/eskimo.png"); 
}

function setup() {
  createCanvas(1000, 600);
  imageMode(CENTER);

  //cyclops
  character = new Character(random(80, width - 80), random(80, height - 80));
  character.addAnimation("up", new SpriteAnimation(cyclops, 6, 5, 6));  
  character.addAnimation("down", new SpriteAnimation(cyclops, 0, 5, 6));
  character.addAnimation("left", new SpriteAnimation(cyclops, 0, 0, 10));
  character.addAnimation("right", new SpriteAnimation(cyclops, 0, 0, 10));
  character.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));  
  character.currentAnimation = "stand";

  //green
  character2 = new Character(random(80, width - 80), random(80, height - 80));
  character2.addAnimation("up", new SpriteAnimation(green, 6, 5, 6));  
  character2.addAnimation("down", new SpriteAnimation(green, 0, 5, 6));
  character2.addAnimation("left", new SpriteAnimation(green, 0, 0, 10));
  character2.addAnimation("right", new SpriteAnimation(green, 0, 0, 10));
  character2.addAnimation("stand", new SpriteAnimation(green, 0, 0, 1));  
  character2.currentAnimation = "stand";

  //spelunky
  character3 = new Character(random(80, width - 80), random(80, height - 80));
  character3.addAnimation("up", new SpriteAnimation(spelunky, 6, 5, 6));  
  character3.addAnimation("down", new SpriteAnimation(spelunky, 0, 5, 6));
  character3.addAnimation("left", new SpriteAnimation(spelunky, 0, 0, 10));
  character3.addAnimation("right", new SpriteAnimation(spelunky, 0, 0, 10));
  character3.addAnimation("stand", new SpriteAnimation(spelunky, 0, 0, 1));  
  character3.currentAnimation = "stand";

  //robot
  character4 = new Character(random(80, width - 80), random(80, height - 80));
  character4.addAnimation("up", new SpriteAnimation(robot, 6, 5, 6));  
  character4.addAnimation("down", new SpriteAnimation(robot, 0, 5, 6));
  character4.addAnimation("left", new SpriteAnimation(robot, 0, 0, 10));
  character4.addAnimation("right", new SpriteAnimation(robot, 0, 0, 10));
  character4.addAnimation("stand", new SpriteAnimation(robot, 0, 0, 1));  
  character4.currentAnimation = "stand";

  //eskimo
  character5 = new Character(random(80, width - 80), random(80, height - 80));
  character5.addAnimation("up", new SpriteAnimation(eskimo, 6, 5, 6));  
  character5.addAnimation("down", new SpriteAnimation(eskimo, 0, 5, 6));
  character5.addAnimation("left", new SpriteAnimation(eskimo, 0, 0, 10));
  character5.addAnimation("right", new SpriteAnimation(eskimo, 0, 0, 10));
  character5.addAnimation("stand", new SpriteAnimation(eskimo, 0, 0, 1));  
  character5.currentAnimation = "stand";
}

function draw() {
  background(253,228,247);
  character.draw();
  character2.draw();
  character3.draw();
  character4.draw();
  character5.draw();
}

function keyPressed() {
  character.keyPressed();
  character2.keyPressed();
  character3.keyPressed();
  character4.keyPressed();
  character5.keyPressed();
}

function keyReleased() {
  character.keyReleased();
  character2.keyReleased();
  character3.keyReleased();
  character4.keyReleased();
  character5.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
          break;
        case "left":
          this.x -= 2;
          animation.flipped = true;
          break;
        case "right":
          this.x += 2;
          break;
      }

      push();
      translate(this.x, this.y); 
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
    }
  }

  keyReleased() {
    this.currentAnimation = "stand";
    //this.animations[this.currentAnimation].flipped = true;
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

  draw() {
    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.framecount++;
    if (this.framecount % 10 === 0) {
      this.u++;
      if (this.u === this.startU + this.duration) {
        this.u = this.startU;
      }
    }
  }
}