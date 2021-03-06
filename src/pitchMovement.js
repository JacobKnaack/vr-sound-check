'use strict';

var pitchDetect = require('./services/pitchDetect.js');
var normalizePitch = require('./services/normalizePitch.js');
var batchPitches = require('./services/batchPitches.js');


  // Game time limit in ms
  window.timeLimit = 30000;

  // Number of ms between collecting pitches
  var msBetweenPitches = 1;

  // Timeframe to batch pitches (e.g. collect batch every second) in ms
  var pitchBatchTime = 250;

  // Start Game
  var gameStartEvent = new CustomEvent('gameStart', {timeLimit: timeLimit});

  document.addEventListener('gameStart',  function(e) {
    console.log('event triggered')
  }, false);

  window.setTimeout(function() {
    document.dispatchEvent(gameStartEvent);
  }, 1000);


  // Begin Pitch Detection
  pitchDetect(msBetweenPitches, timeLimit);
  batchPitches(normalizePitch, pitchBatchTime, timeLimit);


  // Countdown of time remaining
  var secondsLeftInterval = window.setInterval(function() {
    var hudCountdown = document.getElementById('hudCountdown');
    window.secondsLeft = window.secondsLeft - 1 || (window.timeLimit / 1000)
    hudCountdown.setAttribute('text', 'value: Time\nRemaining\n\n' + window.secondsLeft);

    if (window.secondsLeft < 1 || window.secondsLeft == window.timeLimit) {
      window.clearInterval(secondsLeftInterval)
    }
  }, 1000);



  // Update Camera Speed from Pitch
  var cameraSpeedInterval = window.setInterval( function() {
    let camera = document.querySelector('#cameraWrapper');
    camera.setAttribute('wasd-controls', `acceleration: ${window.currentPitch * 5}; easing: 15`);
    // console.log(camera.components.position.attrValue.z);
    if(camera.components.position.attrValue.z <= -1100) {
      console.log(camera);
      camera.setAttribute('wasd-controls', 'enabled: false');
      camera.setAttribute('wasd-controls', 'acceleration: 0');

      //
      window.clearInterval(cameraSpeedInterval);
    }
  }, pitchBatchTime);

  // Stop updating speed when time runs out
  window.setTimeout(function() {

    // Stop Updating Speed when game time runs out
    window.clearInterval(cameraSpeedInterval);

    let camera = document.querySelector('#cameraWrapper');
    camera.setAttribute('wasd-controls', 'enabled: false');
    camera.setAttribute('wasd-controls', 'acceleration: 0');
    camera.removeAttribute('wasd-controls');

  }, timeLimit);




