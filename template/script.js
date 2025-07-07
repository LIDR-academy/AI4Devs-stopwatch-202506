// script.js

const display = document.getElementById("display");
const error = document.getElementById("error");
const countdownInput = document.getElementById("countdownInput");

let chronoInterval = null;
let isCountdown = false;
let chronoTime = 0;
let countdownTime = 0;

// Formatea los segundos a HH:MM:SS
function formatTime(totalSeconds) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// Actualiza la pantalla
function updateDisplay(time) {
  display.textContent = formatTime(time);
}

// Inicia cronómetro o cuenta atrás
document.getElementById("startBtn").addEventListener("click", () => {
  clearInterval(chronoInterval);

  const inputVal = countdownInput.value.trim();
  if (inputVal && !chronoTime) {
    const seconds = parseInt(inputVal, 10);
    if (isNaN(seconds) || seconds <= 0) {
      error.textContent = "Ingresa un número positivo válido.";
      return;
    }
    isCountdown = true;
    countdownTime = seconds;
    updateDisplay(countdownTime);
    error.textContent = "";
  } else {
    isCountdown = false;
  }

  chronoInterval = setInterval(() => {
    if (isCountdown) {
      countdownTime--;
      updateDisplay(countdownTime);
      if (countdownTime <= 0) {
        clearInterval(chronoInterval);
        chronoInterval = null;
        alert("Cuenta atrás finalizada");
      }
    } else {
      chronoTime++;
      updateDisplay(chronoTime);
    }
  }, 1000);
});

// Pausa
document.getElementById("pauseBtn").addEventListener("click", () => {
  clearInterval(chronoInterval);
  chronoInterval = null;
});

// Reinicia
document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(chronoInterval);
  chronoInterval = null;
  chronoTime = 0;
  countdownTime = 0;
  isCountdown = false;
  updateDisplay(0);
  error.textContent = "";
  countdownInput.value = "";
});
