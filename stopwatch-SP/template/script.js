// Estado global
let mode = 'stopwatch'; // 'stopwatch' o 'timer'
let interval = null;
let startTime = 0;
let elapsed = 0;
let countdown = 0; // ms para cuenta atrás
let running = false;

const display = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const clearBtn = document.getElementById('clear-btn');
const modeStopwatch = document.getElementById('mode-stopwatch');
const modeTimer = document.getElementById('mode-timer');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  return `${hours}:${minutes}:${seconds} <span class="ms">${milliseconds}</span>`;
}

function updateDisplay() {
  if (mode === 'stopwatch') {
    display.innerHTML = formatTime(elapsed);
  } else {
    display.innerHTML = formatTime(Math.max(0, countdown - elapsed));
  }
}

function tick() {
  if (!running) return;
  elapsed = Date.now() - startTime;
  if (mode === 'timer') {
    if (elapsed >= countdown) {
      running = false;
      clearInterval(interval);
      elapsed = countdown;
    }
  }
  updateDisplay();
}

startBtn.onclick = function() {
  if (!running) {
    running = true;
    startBtn.textContent = 'Pause';
    startTime = Date.now() - elapsed;
    interval = setInterval(tick, 10);
  } else {
    running = false;
    startBtn.textContent = 'Start';
    clearInterval(interval);
  }
};

clearBtn.onclick = function() {
  running = false;
  clearInterval(interval);
  startBtn.textContent = 'Start';
  elapsed = 0;
  if (mode === 'timer') {
    updateDisplay();
  } else {
    updateDisplay();
  }
};

modeStopwatch.onclick = function() {
  if (mode !== 'stopwatch') {
    mode = 'stopwatch';
    modeStopwatch.classList.add('active');
    modeStopwatch.disabled = true;
    modeTimer.classList.remove('active');
    modeTimer.disabled = false;
    running = false;
    clearInterval(interval);
    startBtn.textContent = 'Start';
    elapsed = 0;
    updateDisplay();
  }
};

modeTimer.onclick = function() {
  if (mode !== 'timer') {
    // Solicita tiempo en un solo prompt
    let input = prompt('Introduce el tiempo para la cuenta atrás (mm:ss o solo segundos):', '0:10');
    if (input === null) return; // Si cancela, no cambia de modo
    let min = 0, sec = 0;
    if (input.includes(':')) {
      const parts = input.split(':');
      min = parseInt(parts[0]) || 0;
      sec = parseInt(parts[1]) || 0;
    } else {
      sec = parseInt(input) || 0;
    }
    if (isNaN(min) || isNaN(sec) || (min === 0 && sec === 0)) return; // Si no es válido, no cambia de modo
    countdown = (min * 60 + sec) * 1000;
    mode = 'timer';
    modeTimer.classList.add('active');
    modeTimer.disabled = true;
    modeStopwatch.classList.remove('active');
    modeStopwatch.disabled = false;
    running = false;
    clearInterval(interval);
    startBtn.textContent = 'Start';
    elapsed = 0;
    updateDisplay();
  }
};

function setTimer() {
  // Solicita minutos y segundos al usuario
  let min = prompt('Minutos para la cuenta atrás:', '0');
  let sec = prompt('Segundos para la cuenta atrás:', '10');
  min = parseInt(min) || 0;
  sec = parseInt(sec) || 0;
  countdown = (min * 60 + sec) * 1000;
  updateDisplay();
}

// Inicialización
updateDisplay();
modeStopwatch.disabled = true;
