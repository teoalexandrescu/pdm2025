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
let startSound, endSound, squishSound;
let audioButton, synth1, synth2, part1, seq1, gain1, panner, filt, noiseEnv, noise1, centerFreq;

function preload() {
  gameFont = loadFont("media/Jersey25-Regular.ttf");
  bugSprite = loadImage("media/spider.png");
  squishedSprite = loadImage("media/squished.png");
}

function setup() {
  createCanvas(1000, 600);
  textFont(gameFont);
  imageMode(CENTER);

  audioButton = createButton("Start Audio");
  audioButton.position(width/2-50, height/100);
  audioButton.mousePressed(() => {
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        console.log("Context has started");
      });
    }
  });

  startSound = new Tone.Player("media/gamestart.mp3").toDestination();
  endSound = new Tone.Player("media/gameover.mp3").toDestination();
  squishSound = new Tone.Player("media/squish.mp3").toDestination();
  startSound.autostart = false;
  endSound.autostart = false;
  squishSound.autostart = false;

  Tone.Transport.timeSignature = [3, 4];  
  Tone.Transport.bpm.value = 100;
  synth1 = new Tone.AMSynth().toDestination();
  synth2 = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" }, 
    envelope: { attack: 0.2, 
                decay: 0.3, 
                sustain: 0.1, 
                release: 0.8 }
  }).toDestination();

  part1 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.dur, time);
  }), 
  [
    { time: 0, note: "C5", dur: "8n" },
    { time: "0:1", note: "E5", dur: "16n" },
    { time: "0:2", note: "G5", dur: "16n" },
    { time: "1:0", note: "A4", dur: "8n" },
    { time: "1:1", note: "C5", dur: "16n" },
    { time: "1:2", note: "E5", dur: "16n" },
    { time: "2:0", note: "F4", dur: "8n" },
    { time: "2:1", note: "A4", dur: "16n" },
    { time: "3:0", note: "G4", dur: "8n" },
    { time: "3:1", note: "B4", dur: "16n" }
  ]);
  part1.loop = true;
  part1.loopEnd = "4m";
  seq1 = new Tone.Sequence((time, note) => {
    synth2.triggerAttackRelease(note, "4n", time);
  }, [null, "C5", null, "E5", "G5", null, null, "A5", "C5", "F5", "E5", "D5", null, "F5", "G5",
    "A5", "C6", "F5", "A5", "C5", "F5", "G5", null, "C5", "E5", "F5"], "4n");

  seq1.mute = true;  
  part1.mute = true;

  const reverb = new Tone.Reverb(0.1).toDestination();  
  synth2.connect(reverb);
  gain1 = new Tone.Gain().toDestination();
  panner = new Tone.Panner(0).connect(gain1);
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.3,
    decay: 0.3,
    sustain: 1,
    release: 0.2
  }).connect(panner);
  centerFreq = map(height / 2, 0, height, 4000, 1500, true);
  filt = new Tone.Filter(1000, "lowpass").connect(noiseEnv);
  noise1 = new Tone.Noise("white").start().connect(filt);

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

      let timeElapsed = 30 - time;
      if (Math.floor(timeElapsed) % 5 === 0) { 
        let newBPM = 100 + Math.floor(timeElapsed/5)*20;
        if (Tone.Transport.bpm.value !== newBPM) {  
          Tone.Transport.bpm.value = newBPM;  
      }
    }
      if (time <= 0) {
        gameState = GameStates.END;
        Tone.Transport.stop();
        endSound.start();
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
  if (Tone.context.state !== "running") {
    Tone.start().then(() => {
      Tone.Transport.start();
    });
  } else if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  }

  switch (gameState) {
    case GameStates.START:
      if (keyCode === ENTER) {
        gameState = GameStates.PLAY;
        startSound.start();
        part1.mute = false; 
        seq1.mute = false;
        part1.start(); 
        seq1.start(); 
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
      score++;
      squishSound.start(); 
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