//Teodora Alexandrescu
let basicSynth, filt, LFOfilt, panner, noise1, noiseEnv, boat;
let showImage = false;
let soundPlayed = false;

function preload() {
  boat = loadImage("media/boat.png");

  basicSynth = new Tone.Synth({
    oscillator: { type: 'square', detune: 0},
    envelope: { 
      attack: 0.3, 
      decay: 0.6, 
      sustain: 0.8, 
      release: 1.2 
    }
  }).toDestination();
  filt = new Tone.Filter(20, "lowpass", -6).toDestination();
  LFOfilt = new Tone.LFO(0.1, 30, 120).start();
  LFOfilt.connect(filt.frequency);
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1, 
    decay: 0.5, 
    sustain: 0.6, 
    release: 1
  }).connect(filt);
  noise1 = new Tone.Noise("pink").connect(noiseEnv);
  panner = new Tone.AutoPanner({ frequency: 0.2, depth: 1 }).toDestination().start();
  filt.connect(panner);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(239,178,229);

  if (showImage && boat) {
    image(boat, 20, 20, 350, 350);
  } else {
    textSize(22);
    fill(7,35,96);
    textAlign(CENTER, CENTER);
    text("Click mouse to start the boat honk", width/2, height/2);

  }
}

function mousePressed() {
  showImage = true;
  soundPlayed = true;
  basicSynth.triggerAttack(35);
  noiseEnv.triggerAttack();
}

function mouseReleased() {
  showImage = false;
  basicSynth.triggerRelease();
  noiseEnv.triggerRelease();
}

function keyPressed() {
  if (key === "a") {
    noiseEnv.triggerAttackRelease(30);
    noise1.volume.setValueCurveAtTime(values1, Tone.now(), 30);
    console.log('testing');
  }
}
