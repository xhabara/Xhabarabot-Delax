let highPassFilter1, lowPassFilter1, highPassFilter2, lowPassFilter2;

let sound1, sound2, delay1, delay2;
let delayTimeSlider1, pitchSlider1, octaveSlider1;
let delayTimeSlider2, pitchSlider2, octaveSlider2;
let panSlider1, panSlider2;
let volumeSlider1, volumeSlider2;
let slider;

let syncButton;
let isPlaying = false;

let isAutonomousOn = false;
let targetSliders = {};

let noiseOffset1 = 0;
let noiseOffset2 = 0;
let noiseOffsetHighPass1 = 5000;
let noiseOffsetLowPass1 = 6000;
let noiseOffsetHighPass2 = 7000;
let noiseOffsetLowPass2 = 8000;

let recorder, soundFile;
let isRecording = false;

function preload() {
  sound1 = loadSound("RullyShabaraSampleR01.wav");
  sound2 = loadSound("RullyShabaraSampleR01.wav");
}

function setup() {
  createCanvas(370, 400);
  
  background (55);
  sound1.stop();
  sound2.stop();
  
  
  delay1 = new p5.Delay();
  delay1.process(sound1, 0.12, 0.7, 2300);
  delay2 = new p5.Delay();
  delay2.process(sound2, 0.12, 0.7, 2300);
  
  highPassFilter1 = new p5.HighPass();
highPassFilter1.freq(0);
lowPassFilter1 = new p5.LowPass();
lowPassFilter1.freq(1000);

highPassFilter2 = new p5.HighPass();
highPassFilter2.freq(0);
lowPassFilter2 = new p5.LowPass();
lowPassFilter2.freq(1000);
  

recorder = new p5.SoundRecorder();
soundFile = new p5.SoundFile();

  let saveButton = createButton("Start Recording");
  saveButton.position(130, 280).class('button');  
  saveButton.mousePressed(toggleRecording);

  function toggleRecording() {
    if (!isRecording) {
      recorder.record(soundFile);
      saveButton.html('Stop Recording');
      isRecording = true;
    } else {
      recorder.stop();
      saveButton.html('Download Recording');
      soundFile.save('XhabarabotDelax.wav');
      isRecording = false;
    }
  }

  // Add a start button
  let startButton = createButton("Start/Stop");
  startButton.position(140, 82).class('button');
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

   // Add sync button
  syncButton = createButton("Sync");
  syncButton.position(152, 165).class('button');
  syncButton.mousePressed(syncSounds);
  
  textSize(8);
  fill(255);
  text("DELAY", 160, 28);
  text("RATE", 160, 48);
  text("PITCH", 160, 68);
  text("PAN", 165, 137);
  text("VOL", 165, 157);
  
  text("LOPASS", 160, 210);
  text("HIPASS", 160, 230);
  



  
 // Column 1
delayTimeSlider1 = createSlider(0, 1, 0.12, 0.01);
pitchSlider1 = createSlider(0.5, 2, 1, 0.01);
octaveSlider1 = createSlider(-2, 2, 0, 0.1);
delayTimeSlider1.position(20, 20);
pitchSlider1.position(20, 40);
octaveSlider1.position(20, 60);
panSlider1 = createSlider(-1, 1, 0, 0.01);
panSlider1.position(20, 130);
volumeSlider1 = createSlider(0, 1, 1, 0.01);
volumeSlider1.position(20, 150);
highPassSlider1 = createSlider(0, 9000, 0, 0.1);
lowPassSlider1 = createSlider(200, 10000, 20, 1);

highPassSlider1.position(20, 200);
lowPassSlider1.position(20, 220);

// Column 2
delayTimeSlider2 = createSlider(0, 1, 0.12, 0.01);
pitchSlider2 = createSlider(0.5, 2, 1, 0.01);
octaveSlider2 = createSlider(-2, 2, 0, 0.1);
delayTimeSlider2.position(200, 20); // add an offset to the horizontal position
pitchSlider2.position(200, 40); // add an offset to the horizontal position
octaveSlider2.position(200, 60); // add an offset to the horizontal position
panSlider2 = createSlider(-1, 1, 0, 0.01);
panSlider2.position(200, 130); // add an offset to the horizontal position
volumeSlider2 = createSlider(0, 1, 1, 0.01);
volumeSlider2.position(200, 150); // add an offset to the horizontal position
highPassSlider2 = createSlider(0, 9000, 0, 1);
lowPassSlider2 = createSlider(0, 20000, 20, 1);
highPassSlider2.position(200, 200); // add an offset to the horizontal position
lowPassSlider2.position(200, 220); // add an offset to the horizontal position
  
  
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

  if (isAutonomousOn) {
  // Use Perlin noise for smooth randomness
  delayTimeSlider1.value(map(noise(noiseOffset1), 0, 1, 0, 1));
  pitchSlider1.value(map(noise(noiseOffset1 + 1000), 0, 1, 0.5, 2));
  octaveSlider1.value(map(noise(noiseOffset1 + 2000), 0, 1, -2, 2));
  panSlider1.value(map(noise(noiseOffset1 + 3000), 0, 1, -1, 1));
  volumeSlider1.value(map(noise(noiseOffset1 + 4000), 0, 1, 0, 1));
  
  delayTimeSlider2.value(map(noise(noiseOffset2), 0, 1, 0, 1));
  pitchSlider2.value(map(noise(noiseOffset2 + 1000), 0, 1, 0.5, 2));
  octaveSlider2.value(map(noise(noiseOffset2 + 2000), 0, 1, -2, 2));
  panSlider2.value(map(noise(noiseOffset2 + 3000), 0, 1, -1, 1));
  volumeSlider2.value(map(noise(noiseOffset2 + 4000), 0, 1, 0, 1));
    
    highPassSlider1.value(map(noise(noiseOffsetHighPass1), 0, 1, 0, 9000));
  lowPassSlider1.value(map(noise(noiseOffsetLowPass1), 0, 1, 200, 10000));
  
  highPassSlider2.value(map(noise(noiseOffsetHighPass2), 0, 1, 0, 9000));
  lowPassSlider2.value(map(noise(noiseOffsetLowPass2), 0, 1, 200, 10000));

  // Increment noise offset for smooth transition
  noiseOffset1 += 0.001;
  noiseOffset2 += 0.005;
    noiseOffsetHighPass1 += 0.01;
  noiseOffsetLowPass1 += 0.01;
  noiseOffsetHighPass2 += 0.015;
  noiseOffsetLowPass2 += 0.015;
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
sound1.rate(pitchSlider1.value() * pow(2, octaveSlider1.value()));
sound1.amp(volumeSlider1.value());
sound1.pan(panSlider1.value());

sound1.disconnect();  // Disconnect sound from p5's master output
delay1.process(sound1, delayTimeSlider1.value(), 0.7, 2300);  // Apply delay
highPassFilter1.process(delay1);  // Apply high-pass filter
lowPassFilter1.process(highPassFilter1);  // Apply low-pass filter

highPassFilter1.freq(highPassSlider1.value());
lowPassFilter1.freq(lowPassSlider1.value());

// Column 2
sound2.rate(pitchSlider2.value() * pow(2, octaveSlider2.value()));
sound2.amp(volumeSlider2.value());
sound2.pan(panSlider2.value());

sound2.disconnect();  // Disconnect sound from p5's master output
delay2.process(sound2, delayTimeSlider2.value(), 0.7, 2300);  // Apply delay
highPassFilter2.process(delay2);  // Apply high-pass filter
lowPassFilter2.process(highPassFilter2);  // Apply low-pass filter

highPassFilter2.freq(highPassSlider2.value());
lowPassFilter2.freq(lowPassSlider2.value());
 

if (isRecording) {
  recorder.setInput(delay1);
  recorder.setInput(delay2);
}

  
  }
  
function randomizeSlider(slider, min, max, step) {
  let currentValue = slider.value();
  let randomOffset = random(-step, step); // Randomly go up or down a step
  let newValue = constrain(currentValue + randomOffset, min, max);
  slider.value(newValue);
}



function syncSounds() {
  delay1.delayTime(delayTimeSlider2.value());
  highPassSlider1.value(highPassSlider2.value());
  lowPassSlider1.value(lowPassSlider2.value());
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
    let newValue;

    
    newValue = targetValue;


    slider.value(newValue);

    // If close enough to the target, clear the target
    if (abs(newValue - targetValue) < 0.01) {
      delete targetSliders[targetKey];
    }
  }
}

