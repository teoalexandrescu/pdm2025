//Teodora Alexandrescu
let synth1, filt, rev, metalSynth, noise1, noise2, ampEnv1, ampEnv2, filt1;
let activeKey = null;

let keyNotes = {
  'a': 'A4',
  's': 'B4',
  'd': 'C5',
  'f': 'D5',
  'g': 'E5', 
  'h': 'F5',
  'j': 'G5',
  'k': 'A5'
};

let keyNotes1 = {
  'q': 'D4',
  'w': 'F4',
  'e': 'A4',
  'r': 'C5',  
  't': 'E5',  
  'y': 'G4',  
  'u': 'A5',
  'i': 'C6'

};

let pitchShift;
let pitchSlider;

function setup() {
  createCanvas(400, 400);

  pitchShift = new Tone.PitchShift(0).toDestination();

  filt = new Tone.Filter(1500, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(rev);
  synth1.portamento.value = 0.5;
  metalSynth = new Tone.MetalSynth({
    envelope: {
      attack: 0.1,
      decay: 1,
      sustain: 1,
      release: 1.5
    },
    frequency: 440,
    harmonicity: 1,
    resonance: 500,
    modulationIndex: 5
  }).connect(rev);
  metalSynth.volume.value = -6;
  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();
  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink').start().connect(filt1);

  synth1.connect(pitchShift);
  metalSynth.connect(pitchShift);
  pitchShift.connect(filt);

  pitchSlider = createSlider(-25, 25, 0, 1); 
  pitchSlider.position(20, 180);
  pitchSlider.input(() => { pitchShift.pitch = pitchSlider.value() });
}

function draw() {
  background(239,178,229);
  text("keys a-k are the monophonic synth,  \nkeys q-i are the polyphonic synth, \nkey z is the noise.", 20, 20);
  text("Pitch Shift Amount: " + pitchSlider.value(), 200, 193);
}

function keyPressed() {
  let pitch = keyNotes[key];
  let pitch1 = keyNotes1[key];
  if (pitch && key !== activeKey) {
    synth1.triggerRelease();
    activeKey = key;
    synth1.triggerAttack(pitch);
  } else if (pitch1) {
    metalSynth.triggerAttack(pitch1);
  } else if (key === "z") {
    ampEnv1.triggerAttackRelease(0.1);
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  if (key === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  } else if (pitch1) {
    metalSynth.triggerRelease(pitch1); 
  }
}

