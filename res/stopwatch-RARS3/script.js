let mode = null;
let stopwatchInterval = null;
let countdownInterval = null;
let startTime = null;
let elapsedTime = 0;
let countdownTime = 0;
let paused = false;
let laps = [];

const display = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');
const stopwatchModeBtn = document.querySelector('#stopwatchMode');
const countdownModeBtn = document.querySelector('#countdownMode');
const countdownInputs = document.getElementById('countdownInputs');
const lapsList = document.getElementById('lapsList');
const alarmSound = document.getElementById('alarmSound');
const mainApp = document.getElementById('mainApp');
const modePanel = document.querySelector('.mode-panel');

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / 60000) % 60;
  let hours = Math.floor(ms / 3600000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateDisplay(time) {
  display.textContent = formatTime(time);
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  stopwatchInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 10);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  stopStopwatch();
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  laps = [];
  lapsList.innerHTML = '';
}

function addLap() {
  const lapTime = formatTime(elapsedTime);
  const li = document.createElement('li');
  li.textContent = `Lap ${laps.length + 1}: ${lapTime}`;
  lapsList.appendChild(li);
  laps.push(lapTime);
}

function startCountdown() {
  const h = parseInt(document.getElementById('hours').value || '0');
  const m = parseInt(document.getElementById('minutes').value || '0');
  const s = parseInt(document.getElementById('seconds').value || '0');
  countdownTime = (h * 3600 + m * 60 + s) * 1000;
  updateDisplay(countdownTime);
  startTime = Date.now();
  countdownInterval = setInterval(() => {
    let remaining = countdownTime - (Date.now() - startTime);
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      updateDisplay(0);
      flashScreen();
      alarmSound.play();
      return;
    }
    updateDisplay(remaining);
  }, 10);
}

function stopCountdown() {
  clearInterval(countdownInterval);
}

function resetCountdown() {
  stopCountdown();
  countdownTime = 0;
  updateDisplay(0);
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
}

function flashScreen() {
  document.body.classList.add('flash');
  setTimeout(() => document.body.classList.remove('flash'), 1000);
}

function switchMode(newMode) {
  mode = newMode;
  stopwatchModeBtn.classList.toggle('active', mode === 'stopwatch');
  countdownModeBtn.classList.toggle('active', mode === 'countdown');
  countdownInputs.classList.toggle('hidden', mode !== 'countdown');
  lapsList.innerHTML = '';
  resetAll();
  modePanel.classList.add('hidden');
  mainApp.classList.remove('hidden');
}

function resetAll() {
  stopStopwatch();
  stopCountdown();
  elapsedTime = 0;
  countdownTime = 0;
  updateDisplay(0);
  laps = [];
}

startBtn.onclick = () => {
  if (mode === 'stopwatch') startStopwatch();
  else startCountdown();
  startBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
};

pauseBtn.onclick = () => {
  if (mode === 'stopwatch') stopStopwatch();
  else stopCountdown();
  paused = true;
  pauseBtn.classList.add('hidden');
  resumeBtn.classList.remove('hidden');
};

resumeBtn.onclick = () => {
  if (mode === 'stopwatch') startStopwatch();
  else {
    countdownTime -= (Date.now() - startTime);
    startCountdown();
  }
  paused = false;
  resumeBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
};

resetBtn.onclick = () => {
  if (mode === 'stopwatch') resetStopwatch();
  else resetCountdown();
  startBtn.classList.remove('hidden');
  pauseBtn.classList.add('hidden');
  resumeBtn.classList.add('hidden');
};



stopwatchModeBtn.addEventListener('click', () => switchMode('stopwatch'));
stopwatchModeBtn.querySelector('svg')?.addEventListener('click', () => switchMode('stopwatch'));
stopwatchModeBtn.querySelector('span')?.addEventListener('click', () => switchMode('stopwatch'));

countdownModeBtn.addEventListener('click', () => switchMode('countdown'));
countdownModeBtn.querySelector('svg')?.addEventListener('click', () => switchMode('countdown'));
countdownModeBtn.querySelector('span')?.addEventListener('click', () => switchMode('countdown'));

const backBtn = document.createElement('button');
backBtn.textContent = '← Back';
backBtn.style.marginBottom = '1rem';
backBtn.onclick = () => {
  mainApp.classList.add('hidden');
  modePanel.classList.remove('hidden');
  stopwatchModeBtn.classList.remove('active');
  countdownModeBtn.classList.remove('active');
  resetAll();
  startBtn.classList.remove('hidden');
  pauseBtn.classList.add('hidden');
  resumeBtn.classList.add('hidden');
};
document.querySelector('.container').insertBefore(backBtn, mainApp);

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && mainApp.classList.contains('hidden') === false) startBtn.click();
  if (e.key === 'Escape' && mainApp.classList.contains('hidden') === false) resetBtn.click();
});
