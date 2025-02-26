//Teodora Alexandrescu

let startContext, samples, sampler, button1, button2, button3, button4, delTimeSlider, feedbackSlider, wetSlider, distSlider, pitchSlider;
let rev = new Tone.Reverb(5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let pitchShift = new Tone.PitchShift(0).connect(dist); 
let del = new Tone.FeedbackDelay(0, 0).connect(pitchShift);
del.wet.value = 0.5;


function preload() {
  samples = new Tone.Players({
    trap: "media/trap.mp3",
    game: "media/game.mp3",
    beat: "media/beat.mp3",
    techno: "media/techno.mp3"
  }).connect(del);
}

function setup() {
  createCanvas(500, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(20, 20);
  startContext.mousePressed(startAudioContext);
  button1 = createButton("Play trap");
  button1.position(20, 60);
  button1.size(100, 30);  
  button2 = createButton("Play game");
  button2.position(130, 60);
  button2.size(100, 30);  
  button3 = createButton("Play beat");
  button3.position(240, 60);
  button3.size(100, 30);  
  button4 = createButton("Play techno");
  button4.position(350, 60);
  button4.size(100, 30);  

  button1.mousePressed(() => { samples.player("trap").start() });
  button2.mousePressed(() => { samples.player("game").start() });
  button3.mousePressed(() => { samples.player("beat").start() });
  button4.mousePressed(() => { samples.player("techno").start() });

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(20, 120);
  delTimeSlider.input(() => { del.delayTime.value = delTimeSlider.value() });
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(20, 160);
  feedbackSlider.input(() => { del.feedback.value = feedbackSlider.value() });
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(20, 200);
  distSlider.input(() => { dist.distortion = distSlider.value() });
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(20, 240);
  wetSlider.input(() => { rev.wet.value = wetSlider.value() });
  pitchSlider = createSlider(-25, 25, 0, 1); 
  pitchSlider.position(20, 280);
  pitchSlider.input(() => { pitchShift.pitch = pitchSlider.value() });
}

function draw() {
  background(239, 178, 229);
  fill(0);
  textSize(14);
  text("Delay Time: " + delTimeSlider.value(), 200, 135);
  text("Feedback Amount: " + feedbackSlider.value(), 200, 175);
  text("Distortion Amount: " + distSlider.value(), 200, 215);
  text("Reverb Wet Amount: " + wetSlider.value(), 200, 255);
  text("Pitch Shift Amount: " + pitchSlider.value(), 200, 295);
}

function startAudioContext() {
  if (Tone.context.state !== 'running') {
    Tone.start();
    console.log("Audio Context Started");
  } else {
    console.log("Audio Context is already running");
  }
}
