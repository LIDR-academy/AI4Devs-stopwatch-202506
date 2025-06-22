// Stopwatch
let swInterval = null;
let swStartTime = null;
let swElapsed = 0;

function showStopwatch() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('stopwatch').classList.remove('hidden');
  resetStopwatch();
}

function toggleStopwatch() {
  const startStop = document.getElementById('startStopSW');
  const reset = document.getElementById('resetSW');
  if (swInterval) {
    clearInterval(swInterval);
    swInterval = null;
    swElapsed += Date.now() - swStartTime;
    startStop.textContent = 'Start';
    startStop.style.backgroundColor = 'green';
    reset.disabled = false;
  } else {
    swStartTime = Date.now();
    swInterval = setInterval(updateStopwatch, 10);
    startStop.textContent = 'Stop';
    startStop.style.backgroundColor = 'red';
    reset.disabled = true;
  }
}

function updateStopwatch() {
  const now = Date.now();
  const diff = now - swStartTime + swElapsed;
  const ms = diff % 1000;
  const s = Math.floor(diff / 1000) % 60;
  const m = Math.floor(diff / 60000) % 60;
  const h = Math.floor(diff / 3600000);
  document.getElementById('stopwatchDisplay').textContent =
    `${pad(h)}:${pad(m)}:${pad(s)}.${ms.toString().padStart(3, '0')}`;
}

function resetStopwatch() {
  clearInterval(swInterval);
  swInterval = null;
  swElapsed = 0;
  document.getElementById('stopwatchDisplay').textContent = '00:00:00.000';
  const startStop = document.getElementById('startStopSW');
  startStop.textContent = 'Start';
  startStop.style.backgroundColor = 'green';
  document.getElementById('resetSW').disabled = true;
}

function backToHomeFromStopwatch() {
  resetStopwatch();
  document.getElementById('stopwatch').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}

// Countdown
let cdInterval = null;
let cdTime = 0;
let cdRemaining = 0;
let inputDigits = [];

function showCountdown() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('countdown').classList.remove('hidden');
  resetCountdown();
}

function enterDigit(n) {
  if (inputDigits.length >= 6) return;
  inputDigits.push(n);
  updateCountdownDisplayFromDigits();
  if (inputDigits.length === 6) disableKeypad();
  updateStartButtonState();
}

function updateCountdownDisplayFromDigits() {
  let padded = inputDigits.join('').padStart(6, '0');
  const h = padded.substring(0, 2);
  const m = padded.substring(2, 4);
  const s = padded.substring(4, 6);
  cdTime = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
  cdRemaining = cdTime;
  document.getElementById('countdownDisplay').textContent = `${h}:${m}:${s}`;
}

function disableKeypad() {
  document.querySelectorAll('#keypad button').forEach(btn => btn.disabled = true);
}

function enableKeypad() {
  document.querySelectorAll('#keypad button').forEach(btn => btn.disabled = false);
}

function toggleCountdown() {
  const startStop = document.getElementById('startStopCD');
  const reset = document.getElementById('resetCD');
  if (cdInterval) {
    clearInterval(cdInterval);
    cdInterval = null;
    startStop.textContent = 'Start';
    startStop.style.backgroundColor = 'green';
    reset.disabled = false;
  } else if (cdRemaining > 0) {
    cdInterval = setInterval(updateCountdown, 1000);
    startStop.textContent = 'Stop';
    startStop.style.backgroundColor = 'red';
    reset.disabled = true;
    disableKeypad();
  }
}

function updateCountdown() {
  if (cdRemaining <= 0) {
    clearInterval(cdInterval);
    cdInterval = null;
    updateCountdownDisplay(0);
    return;
  }
  cdRemaining -= 1;
  updateCountdownDisplay(cdRemaining);
}

function updateCountdownDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  document.getElementById('countdownDisplay').textContent =
    `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function updateStartButtonState() {
  const btn = document.getElementById('startStopCD');
  btn.disabled = cdTime === 0;
  if (!btn.disabled) {
    btn.style.backgroundColor = 'green';
  }
}

function resetCountdown() {
  clearInterval(cdInterval);
  cdInterval = null;
  inputDigits = [];
  cdTime = 0;
  cdRemaining = 0;
  document.getElementById('countdownDisplay').textContent = '00:00:00';
  enableKeypad();
  const startStop = document.getElementById('startStopCD');
  startStop.textContent = 'Start';
  startStop.style.backgroundColor = 'green';
  startStop.disabled = true;
  document.getElementById('resetCD').disabled = true;
}

function backToHomeFromCountdown() {
  resetCountdown();
  document.getElementById('countdown').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}

function pad(n) {
  return n.toString().padStart(2, '0');
}
