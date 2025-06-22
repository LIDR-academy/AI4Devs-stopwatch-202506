// Stopwatch & Countdown logic

const modeToggle = document.getElementById('mode-toggle');
const timeDisplay = document.getElementById('time-display');
const msDisplay = document.getElementById('ms-display');
const startBtn = document.getElementById('start-btn');
const clearBtn = document.getElementById('clear-btn');
const quickSelectors = document.getElementById('quick-selectors');

let mode = 'stopwatch'; // 'stopwatch' or 'countdown'
let running = false;
let interval = null;
let startTime = 0;
let elapsed = 0;
let countdownTime = 0; // ms
let countdownLeft = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  return { hours, minutes, seconds, milliseconds };
}

function updateDisplay(ms) {
  const { hours, minutes, seconds, milliseconds } = formatTime(ms);
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  msDisplay.textContent = milliseconds;
}

function setMode(newMode) {
  mode = newMode;
  stop();
  if (mode === 'stopwatch') {
    quickSelectors.classList.add('hidden');
    updateDisplay(0);
    msDisplay.classList.remove('text-red-600');
  } else {
    quickSelectors.classList.remove('hidden');
    updateDisplay(countdownTime);
    msDisplay.classList.remove('text-red-600');
  }
}

function start() {
  if (running) return;
  running = true;
  startBtn.textContent = 'Stop';
  if (mode === 'stopwatch') {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);
  } else {
    if (countdownLeft <= 0) countdownLeft = countdownTime;
    startTime = Date.now();
    interval = setInterval(() => {
      const now = Date.now();
      countdownLeft = countdownLeft - (now - startTime);
      startTime = now;
      if (countdownLeft <= 0) {
        countdownLeft = 0;
        updateDisplay(0);
        msDisplay.classList.add('text-red-600');
        stop();
        // Optional: play sound or alert
        return;
      }
      updateDisplay(countdownLeft);
    }, 10);
  }
}

function stop() {
  running = false;
  startBtn.textContent = 'Start';
  clearInterval(interval);
  if (mode === 'stopwatch') {
    // nothing extra
  } else {
    // nothing extra
  }
}

function clear() {
  stop();
  elapsed = 0;
  countdownTime = 0;
  countdownLeft = 0;
  updateDisplay(0);
  msDisplay.classList.remove('text-red-600');
}

// Toggle mode
modeToggle.addEventListener('change', (e) => {
  setMode(e.target.checked ? 'countdown' : 'stopwatch');
});

// Start/Stop button
startBtn.addEventListener('click', () => {
  if (running) {
    stop();
  } else {
    start();
  }
});

// Clear button
clearBtn.addEventListener('click', clear);

// Quick selectors for countdown
quickSelectors.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  if (e.target.dataset.minutes) {
    countdownTime += parseInt(e.target.dataset.minutes) * 60 * 1000;
  }
  if (e.target.dataset.seconds) {
    countdownTime += parseInt(e.target.dataset.seconds) * 1000;
  }
  if (e.target.dataset.reset) {
    countdownTime = 0;
  }
  countdownLeft = countdownTime;
  updateDisplay(countdownTime);
  msDisplay.classList.remove('text-red-600');
});

// Init
setMode('stopwatch');
