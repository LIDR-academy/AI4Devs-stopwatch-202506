// script.js

let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;

let countdownTime = "";
let countdownInterval;

const home = document.getElementById("home");
const stopwatch = document.getElementById("stopwatch");
const countdown = document.getElementById("countdown");

// Navigation
const goTo = (section) => {
  home.classList.add("d-none");
  stopwatch.classList.add("d-none");
  countdown.classList.add("d-none");
  section.classList.remove("d-none");
};

// Stopwatch logic
const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const startStopwatchBtn = document.getElementById("startStopwatch");
const clearStopwatchBtn = document.getElementById("clearStopwatch");

startStopwatchBtn.onclick = () => {
  if (!isStopwatchRunning) {
    const startTime = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(() => {
      stopwatchTime = Date.now() - startTime;
      stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }, 10);
    startStopwatchBtn.textContent = "Pause";
    isStopwatchRunning = true;
  } else {
    clearInterval(stopwatchInterval);
    startStopwatchBtn.textContent = "Start";
    isStopwatchRunning = false;
  }
};

clearStopwatchBtn.onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  stopwatchDisplay.textContent = "00:00:00.000";
  startStopwatchBtn.textContent = "Start";
  isStopwatchRunning = false;
};

// Countdown logic
const countdownDisplay = document.getElementById("countdownDisplay");
const numberKeys = document.querySelectorAll(".number-key");
const setCountdownBtn = document.getElementById("setCountdown");
const clearCountdownBtn = document.getElementById("clearCountdown");
let countdownBuffer = "";

numberKeys.forEach(btn => {
  btn.onclick = () => {
    if (countdownBuffer.length < 6) countdownBuffer += btn.textContent;
    countdownDisplay.textContent = formatCountdownInput(countdownBuffer);
  };
});

setCountdownBtn.onclick = () => {
  const ms = countdownBufferToMs(countdownBuffer);
  if (ms > 0) {
    countdownTime = ms;
    const endTime = Date.now() + countdownTime;
    countdownInterval = setInterval(() => {
      const timeLeft = endTime - Date.now();
      countdownDisplay.textContent = formatTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "00:00:00.000";
        new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg").play();
      }
    }, 10);
  }
};

clearCountdownBtn.onclick = () => {
  clearInterval(countdownInterval);
  countdownBuffer = "";
  countdownDisplay.textContent = "00:00:00.000";
};

// Back navigation
backFromStopwatch.onclick = () => goTo(home);
backFromCountdown.onclick = () => goTo(home);
document.getElementById("stopwatchBtn").onclick = () => goTo(stopwatch);
document.getElementById("countdownBtn").onclick = () => goTo(countdown);

// Utils
function formatTime(ms) {
  if (ms < 0) ms = 0;
  let milliseconds = Math.floor(ms % 1000);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)));

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(n, z = 2) {
  return ("00" + n).slice(-z);
}

function formatCountdownInput(buffer) {
  let padded = buffer.padStart(6, '0');
  return `${padded.slice(0, 2)}:${padded.slice(2, 4)}:${padded.slice(4, 6)}.000`;
}

function countdownBufferToMs(buffer) {
  let padded = buffer.padStart(6, '0');
  let h = parseInt(padded.slice(0, 2)) * 3600000;
  let m = parseInt(padded.slice(2, 4)) * 60000;
  let s = parseInt(padded.slice(4, 6)) * 1000;
  return h + m + s;
}