let sound1, sound2, delay1, delay2;
let delayTimeSlider1, pitchSlider1, octaveSlider1;
let delayTimeSlider2, pitchSlider2, octaveSlider2;
let panSlider1, panSlider2;
let volumeSlider1, volumeSlider2;
let slider;

let syncButton;
let isPlaying = false;

function preload() {
  sound1 = loadSound("RullyShabaraSampleR01.wav");
  sound2 = loadSound("RullyShabaraSampleR01.wav");
}

function setup() {
  createCanvas(355, 300);

  background(55);
  sound1.stop();
  sound2.stop();

  delay1 = new p5.Delay();
  delay1.process(sound1, 0.12, 0.7, 2300);
  delay2 = new p5.Delay();
  delay2.process(sound2, 0.12, 0.7, 2300);

  let startButton = createButton("Start/Stop");
  startButton.position(140, 170).class("button");
  startButton.mousePressed(togglePlay);

  function togglePlay() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      sound1.play();
      sound1.loop();
      sound2.play();
      sound2.loop();
    } else {
      sound1.stop();
      sound2.stop();
    }
  }

  syncButton = createButton("Sync");
  syncButton.position(152, 199).class("button");
  syncButton.mousePressed(syncSounds);

  textSize(8);
  fill(255);
  text("DELAY", 160, 29);
  text("RATE", 160, 49);
  text("PITCH", 160, 69);
  text("PAN", 165, 119);
  text("VOL", 165, 139);

  // Column 1
  delayTimeSlider1 = createSlider(0, 1, 0.12, 0.01);
  pitchSlider1 = createSlider(0.5, 2, 1, 0.01);
  octaveSlider1 = createSlider(-2, 2, 0, 0.1);
  delayTimeSlider1.position(20, 20);
  pitchSlider1.position(20, 40);
  octaveSlider1.position(20, 60);
  panSlider1 = createSlider(-1, 1, 0, 0.01);
  panSlider1.position(20, 110);
  volumeSlider1 = createSlider(0, 1, 1, 0.01);
  volumeSlider1.position(20, 130);

  // Column 2
  delayTimeSlider2 = createSlider(0, 1, 0.12, 0.01);
  pitchSlider2 = createSlider(0.5, 2, 1, 0.01);
  octaveSlider2 = createSlider(-2, 2, 0, 0.1);
  delayTimeSlider2.position(200, 20);
  pitchSlider2.position(200, 40);
  octaveSlider2.position(200, 60);
  panSlider2 = createSlider(-1, 1, 0, 0.01);
  panSlider2.position(200, 110);
  volumeSlider2 = createSlider(0, 1, 1, 0.01);
  volumeSlider2.position(200, 130);
}

function draw() {
  if (!isPlaying) {
    return;
  }

  // Column 1
  delay1.delayTime(delayTimeSlider1.value());
  sound1.rate(pitchSlider1.value() * pow(2, octaveSlider1.value()));
  sound1.amp(volumeSlider1.value());
  sound1.pan(panSlider1.value());

  // Column 2
  delay2.delayTime(delayTimeSlider2.value());
  sound2.rate(pitchSlider2.value() * pow(2, octaveSlider2.value()));
  sound2.amp(volumeSlider2.value());
  sound2.pan(panSlider2.value());
}

function syncSounds() {
  delay1.delayTime(delayTimeSlider2.value());

  pitchSlider1.value(pitchSlider2.value());
  octaveSlider1.value(octaveSlider2.value());
}

function togglePlay() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    sound1.play();
    sound2.play();
    sound1.loop();
    sound2.loop();
  } else {
    sound1.stop();
    sound2.stop();
  }
}
