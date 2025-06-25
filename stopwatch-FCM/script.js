document.addEventListener("DOMContentLoaded", () => {
  const log = (msg) => console.info(`[INFO] ${new Date().toISOString()} - ${msg}`);
  const $ = (id) => document.getElementById(id);

  const inputSection = $("time-input-section");
  const inputs = {
    h: $("in-hours"),
    m: $("in-minutes"),
    s: $("in-seconds"),
  };
  const display = {
    h: $("disp-hours"),
    m: $("disp-minutes"),
    s: $("disp-seconds"),
    ms: $("disp-ms"),
  };
  const alarm = $("alarm-sound");
  const btns = {
    play: $("btn-play-pause"),
    reset: $("btn-reset"),
    stopwatch: $("btn-stopwatch"),
    countdown: $("btn-countdown"),
  };

  let mode = "stopwatch"; // "countdown"
  let interval = null;
  let ms = 0;

  const updateTimeDisplay = (t) => {
    const totalMs = Math.max(0, t);
    const milliseconds = totalMs % 1000;
    const seconds = Math.floor(totalMs / 1000) % 60;
    const minutes = Math.floor(totalMs / 60000) % 60;
    const hours = Math.floor(totalMs / 3600000);
    display.h.textContent = String(hours).padStart(2, "0");
    display.m.textContent = String(minutes).padStart(2, "0");
    display.s.textContent = String(seconds).padStart(2, "0");
    display.ms.textContent = String(milliseconds).padStart(3, "0");
  };

  const stop = () => {
    if (interval) clearInterval(interval);
    interval = null;
    btns.play.textContent = "play_arrow";
  };

// reset actualizado
const reset = () => {
  stop();
  if (mode === "stopwatch") {
    ms = 0;
  } else {
    const h = parseInt(inputs.h.value) || 0;
    const m = parseInt(inputs.m.value) || 0;
    const s = parseInt(inputs.s.value) || 0;
    ms = h * 3600000 + m * 60000 + s * 1000; // inicia en 000
  }
  updateTimeDisplay(ms);
  removeShake();
  log(`Reset in mode ${mode}`);
};

// nueva lógica precisa en play() para countdown
let countdownStart = 0;
let countdownRef = 0;

const play = () => {
  if (!interval) {
    btns.play.textContent = "pause";
    if (mode === "stopwatch") {
      interval = setInterval(() => {
        ms += 100;
        updateTimeDisplay(ms);
      }, 100);
      log("Stopwatch started");
    } else {
      if (ms <= 0) {
        alert("Por favor ingresa un tiempo válido");
        reset();
        return;
      }
      countdownStart = performance.now();
      countdownRef = ms;
      interval = setInterval(() => {
        const elapsed = performance.now() - countdownStart;
        const remaining = Math.max(0, countdownRef - Math.floor(elapsed));
        ms = remaining;
        updateTimeDisplay(ms);
        if (remaining <= 0) {
          triggerAlarm();
          stop();
        }
      }, 30); // no necesita ser 1ms exacto gracias al cálculo real
      log("Countdown started con precisión");
    }
  } else {
    stop();
    log("Paused");
  }
};

  const switchMode = (newMode) => {
    stop();
    mode = newMode;
    inputSection.classList.toggle("hidden", mode !== "countdown");
    reset();
  };

  const triggerAlarm = () => {
    alarm.play();
    log("Alarm triggered");
    Object.values(display).forEach((el) => {
      el.classList.add("animate__animated", "animate__shakeX", "bg-red-flash");
    });
    setTimeout(removeShake, 5000);
  };

  const removeShake = () => {
    Object.values(display).forEach((el) => {
      el.classList.remove("animate__animated", "animate__shakeX", "bg-red-flash");
    });
  };

  const updateDateTime = () => {
    const now = new Date();
    $("date-display").textContent = now.toLocaleDateString("es-MX", { day: '2-digit', month: 'short', year: 'numeric' });
    $("time-display").textContent = now.toLocaleTimeString("es-MX", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  setInterval(updateDateTime, 1000);
  updateDateTime();

  btns.stopwatch.addEventListener("click", () => switchMode("stopwatch"));
  btns.countdown.addEventListener("click", () => switchMode("countdown"));
  btns.play.addEventListener("click", play);
  btns.reset.addEventListener("click", reset);

  switchMode("stopwatch");
});
