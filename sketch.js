let sound1, sound2, delay1, delay2;
let delayTimeSlider1, pitchSlider1, octaveSlider1;
let delayTimeSlider2, pitchSlider2, octaveSlider2;
let panSlider1, panSlider2;
let volumeSlider1, volumeSlider2;
let slider;
let isAutonomousOn = false;
let targetSliders = {};

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
  
  let autonomousButton = createButton("Xhabarabot Takeover");
autonomousButton.position(120, 250).class("button");
autonomousButton.mousePressed(() => {
  isAutonomousOn = !isAutonomousOn;
  if (isAutonomousOn) {
    autonomousButton.html("Stop Xhabarabot Mode");
  } else {
    autonomousButton.html("Xhabarabot Takeover");
  }
});
}

function draw() {
  if (!isPlaying) {
    return;
  }

  // Autonomous Mode with breathing dynamics
  if (isAutonomousOn && random(100) < 0.5) { // 20% chance to update the sliders
    delayTimeSlider1.value(random(0, 1));
    pitchSlider1.value(random(0.5, 2));
    octaveSlider1.value(random(-2, 2));
    panSlider1.value(random(-1, 1));
    volumeSlider1.value(random(0, 1));

    delayTimeSlider2.value(random(0, 1));
    pitchSlider2.value(random(0.5, 2));
    octaveSlider2.value(random(-2, 2));
    panSlider2.value(random(-1, 1));
    volumeSlider2.value(random(0, 1));
  }

      slideToTarget(delayTimeSlider1, "delayTimeSlider1");
    slideToTarget(pitchSlider1, "pitchSlider1");
    slideToTarget(octaveSlider1, "octaveSlider1");
    slideToTarget(panSlider1, "panSlider1");
    slideToTarget(volumeSlider1, "volumeSlider1");
    slideToTarget(delayTimeSlider2, "delayTimeSlider2");
    slideToTarget(pitchSlider2, "pitchSlider2");
    slideToTarget(octaveSlider2, "octaveSlider2");
    slideToTarget(panSlider2, "panSlider2");
    slideToTarget(volumeSlider2, "volumeSlider2");
  

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

function slideToTarget(slider, targetKey) {
  if (targetSliders[targetKey] !== undefined) {
    let currentValue = slider.value();
    let targetValue = targetSliders[targetKey];
    let newValue = lerp(currentValue, targetValue, 0.05); // Gradual slide
    slider.value(newValue);

    // If close enough to the target, clear the target
    if (abs(newValue - targetValue) < 0.01) {
      delete targetSliders[targetKey];
    }
  }
}
