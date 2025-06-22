let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let partialCount = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const clearBtn = document.getElementById("clearBtn");
const partialsContainer = document.getElementById("partials");

function timeToString(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const ms = time % 1000;

  return (
    `${String(hrs).padStart(2, "0")}:` +
    `${String(mins).padStart(2, "0")}:` +
    `${String(secs).padStart(2, "0")}.` +
    `${String(ms).padStart(3, "0")}`
  );
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.innerHTML = timeToStringHTML(elapsedTime);
}

function timeToStringHTML(time) {
  const base = timeToString(time);
  const [hms, ms] = base.split(".");
  return `${hms}<span class="ms">${ms}</span>`;
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = "Stop";
    startStopBtn.classList.remove("start");
    startStopBtn.classList.add("stop");
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("stop");
    startStopBtn.classList.add("start");
    running = false;
  }
});

startStopBtn.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Prevent default context menu
  if (!running) return;

  partialCount++;
  const timeString = timeToString(elapsedTime);

  const p = document.createElement("div");
  p.className = "partial";
  p.textContent = `Partial ${partialCount}: ${timeString}`;
  partialsContainer.appendChild(p);

  partialsContainer.scrollTop = partialsContainer.scrollHeight;
});

clearBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startStopBtn.textContent = "Start";
  startStopBtn.classList.remove("stop");
  startStopBtn.classList.add("start");
  display.innerHTML = "00:00:00<span class=\"ms\">000</span>";
  elapsedTime = 0;
  partialCount = 0;
  running = false;
  partialsContainer.innerHTML = "";
});
