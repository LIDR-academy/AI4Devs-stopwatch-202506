// Navigation
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`${name}-screen`).classList.add('active');
}

// ========== STOPWATCH ==========
let stopwatchInterval, stopwatchStartTime = 0, elapsed = 0;
let laps = [], lapTimestamps = [];

function updateStopwatchDisplay() {
  const time = Date.now() - stopwatchStartTime + elapsed;
  document.getElementById('stopwatch-display').textContent = msToTime(time);
}

function toggleStopwatch() {
  const btn = document.getElementById('stopwatch-start-btn');
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsed += Date.now() - stopwatchStartTime;
    btn.textContent = 'Start';
  } else {
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
    btn.textContent = 'Stop';
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsed = 0;
  laps = [];
  lapTimestamps = [];
  document.getElementById('stopwatch-display').textContent = '00:00.00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('summary').innerHTML = '';
  document.getElementById('stopwatch-start-btn').textContent = 'Start';
}

function recordLap() {
  const now = Date.now();
  const currentElapsed = now - stopwatchStartTime + elapsed;

  // Calculate lap time
  const lastTimestamp = lapTimestamps.length > 0 ? lapTimestamps[lapTimestamps.length - 1] : 0;
  const lapTime = currentElapsed - lastTimestamp;

  laps.unshift(lapTime); // Add lap duration
  lapTimestamps.push(currentElapsed); // Track total timestamp for next lap

  // Update lap list
  const lapsContainer = document.getElementById('laps');
  lapsContainer.innerHTML = laps.map((ms, i) => `<div>Lap ${laps.length - i}: ${msToTime(ms)}</div>`).join('');

  renderSummary();
}

function msToTime(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function renderSummary() {
  if (laps.length === 0) return;

  const fastest = msToTime(Math.min(...laps));
  const slowest = msToTime(Math.max(...laps));
  const average = msToTime(Math.floor(laps.reduce((a, b) => a + b, 0) / laps.length));

  document.getElementById('summary').innerHTML = `
    <table>
      <tr><th>Fastest</th><th>Slowest</th><th>Average</th></tr>
      <tr><td>${fastest}</td><td>${slowest}</td><td>${average}</td></tr>
    </table>
  `;
}

// ========== COUNTDOWN ==========
let countdownInterval, totalSeconds = 0, remaining = 0;

function updateCountdownDisplay() {
  const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  document.getElementById('countdown-display').textContent = `${h}:${m}:${s}`;
}

function toggleCountdown() {
  const btn = document.getElementById('countdown-start-btn');
  const hInput = document.getElementById('input-hours');
  const mInput = document.getElementById('input-minutes');
  const sInput = document.getElementById('input-seconds');
  const msgContainer = document.getElementById('countdown-error');

  const h = parseInt(hInput.value) || 0;
  const m = parseInt(mInput.value) || 0;
  const s = parseInt(sInput.value) || 0;

  // Validation
  if (m > 59 || s > 59) {
    msgContainer.textContent = "Please enter minutes and seconds less than or equal to 59.";
    return;
  }
  if (h < 0 || m < 0 || s < 0) {
    msgContainer.textContent = "Please enter only positive numbers.";
    return;
  }

  msgContainer.textContent = '';

  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    btn.textContent = 'Start';
  } else {
    totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds === 0) return;

    remaining = totalSeconds;
    updateCountdownDisplay();
    updateProgress();

    countdownInterval = setInterval(() => {
      remaining--;
      updateCountdownDisplay();
      updateProgress();

      if (remaining <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        handleCountdownEnd();
        btn.textContent = 'Start';
      }
    }, 1000);
    btn.textContent = 'Stop';
  }
}

function resetCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;
  totalSeconds = 0;
  remaining = 0;
  document.getElementById('countdown-display').textContent = '00:00:00';
  document.getElementById('input-hours').value = '';
  document.getElementById('input-minutes').value = '';
  document.getElementById('input-seconds').value = '';
  document.getElementById('countdown-screen').classList.remove('blinking');
  document.getElementById('countdown-progress').textContent = '';
  document.getElementById('countdown-error').textContent = '';
  document.getElementById('countdown-start-btn').textContent = 'Start';
}

function updateProgress() {
  if (totalSeconds > 0 && remaining >= 0) {
    const percent = ((remaining / totalSeconds) * 100).toFixed(1);
    document.getElementById('countdown-progress').textContent = `${percent}% remaining`;
  }
}

function handleCountdownEnd() {
  const screen = document.getElementById('countdown-screen');
  screen.classList.add('blinking');
  document.getElementById('alarm-sound').play();
  setTimeout(() => screen.classList.remove('blinking'), 5000);
}
