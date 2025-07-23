// scripts/script.js

class Timer {
  constructor(displayCallback) {
    this.displayCallback = displayCallback;
    this.reset();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.previous = performance.now();
    this.tick();
  }

  tick() {
    if (!this.running) return;
    const now = performance.now();
    const delta = now - this.previous;
    this.previous = now;
    this.elapsed += delta;
    this.displayCallback(this.elapsed);
    this.frame = requestAnimationFrame(() => this.tick());
  }

  pause() {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  reset() {
    this.elapsed = 0;
    this.running = false;
    cancelAnimationFrame(this.frame);
    if (this.displayCallback) this.displayCallback(this.elapsed);
  }

  getTime() {
    return this.elapsed;
  }
}

function formatTime(ms) {
  const milliseconds = Math.floor(ms % 1000).toString().padStart(3, '0');
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const minutes = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('time-display');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');

  const timer = new Timer((ms) => {
    display.textContent = formatTime(ms);
  });

  let started = false;

  startBtn.addEventListener('click', () => {
    if (!started) {
      timer.start();
      startBtn.textContent = 'Pause';
      started = true;
    } else {
      timer.pause();
      startBtn.textContent = 'Start';
      started = false;
    }
  });

  resetBtn.addEventListener('click', () => {
    timer.reset();
    startBtn.textContent = 'Start';
    started = false;
  });
});
