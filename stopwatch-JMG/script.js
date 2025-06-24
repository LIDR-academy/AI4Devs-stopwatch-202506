const MODES = { CRONOMETRO: 'cronometro', TEMPORIZADOR: 'temporizador' };
let mode = MODES.CRONOMETRO, intervalId = null, startTimestamp = null, elapsed = 0, countdown = 0, countdownTotal = 0;

// UI
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const tabCronometro = document.getElementById('tab-cronometro');
const tabTemporizador = document.getElementById('tab-temporizador');
const setTimerSection = document.getElementById('set-timer-section');
const setTimerBtn = document.getElementById('set-timer-btn');
const inputMinutes = document.getElementById('input-minutes');
const inputSeconds = document.getElementById('input-seconds');

function pad(n, size = 2) { return n.toString().padStart(size, '0'); }
function formatTime(ms) {
  const t = Math.max(0, ms);
  const h = Math.floor(t / 3600000);
  const m = Math.floor((t % 3600000) / 60000);
  const s = Math.floor((t % 60000) / 1000);
  const msd = Math.floor((t % 1000));
  return `${pad(h)}:${pad(m)}:${pad(s)}<span class="text-2xl md:text-4xl align-top ml-2">${pad(msd,3)}</span>`;
}
function updateDisplay(ms) { timeDisplay.innerHTML = formatTime(ms); }
function resetState() {
  clearInterval(intervalId); intervalId = null; elapsed = 0; countdown = 0; startTimestamp = null;
  if (mode === MODES.CRONOMETRO) updateDisplay(0);
  else updateDisplay(countdownTotal);
}
function showButtons(state) {
  // Estado: 'init', 'running', 'paused', 'stopped'
  startBtn.classList.add('hidden'); pauseBtn.classList.add('hidden');
  stopBtn.classList.add('hidden'); resumeBtn.classList.add('hidden');
  if (state === 'init')   { startBtn.classList.remove('hidden'); clearBtn.classList.remove('hidden'); }
  if (state === 'running'){ pauseBtn.classList.remove('hidden'); stopBtn.classList.remove('hidden'); clearBtn.classList.remove('hidden'); }
  if (state === 'paused') { resumeBtn.classList.remove('hidden'); stopBtn.classList.remove('hidden'); clearBtn.classList.remove('hidden'); }
  if (state === 'stopped'){ resumeBtn.classList.remove('hidden'); clearBtn.classList.remove('hidden'); }
}
function switchMode(newMode) {
  if (mode === newMode) return;
  mode = newMode;
  resetState();
  // Tab visual
  if (mode === MODES.CRONOMETRO) {
    tabCronometro.classList.add("tab-active"); tabCronometro.dataset.active = "true";
    tabTemporizador.classList.remove("tab-active"); tabTemporizador.dataset.active = "false";
    setTimerSection.classList.add('hidden');
  } else {
    tabTemporizador.classList.add("tab-active"); tabTemporizador.dataset.active = "true";
    tabCronometro.classList.remove("tab-active"); tabCronometro.dataset.active = "false";
    setTimerSection.classList.remove('hidden');
  }
  showButtons('init');
}
tabCronometro.addEventListener('click', ()=>switchMode(MODES.CRONOMETRO));
tabTemporizador.addEventListener('click', ()=>switchMode(MODES.TEMPORIZADOR));

// Cronómetro
function startCronometro() {
  startTimestamp = Date.now() - elapsed;
  intervalId = setInterval(()=>{ elapsed = Date.now() - startTimestamp; updateDisplay(elapsed); }, 16);
  showButtons('running');
}
function pauseCronometro()  { clearInterval(intervalId); showButtons('paused'); }
function resumeCronometro() { startCronometro(); }
function stopCronometro()   { clearInterval(intervalId); showButtons('stopped'); }
function clearCronometro()  { resetState(); showButtons('init'); }

// Temporizador
function startTemporizador() {
  if (countdownTotal === 0) return alert('Configura primero el tiempo para el temporizador.');
  startTimestamp = Date.now();
  intervalId = setInterval(()=> {
    elapsed = Date.now() - startTimestamp;
    const remaining = countdownTotal - elapsed;
    updateDisplay(remaining);
    if (remaining <= 0) {
      clearInterval(intervalId);
      updateDisplay(0);
      showButtons('init');
      window.navigator.vibrate && window.navigator.vibrate([200,100,200]);
    }
  }, 16);
  showButtons('running');
}
function pauseTemporizador()  { clearInterval(intervalId); countdownTotal = Math.max(0, countdownTotal - (Date.now() - startTimestamp)); showButtons('paused'); }
function resumeTemporizador() { startTemporizador(); }
function stopTemporizador()   { clearInterval(intervalId); showButtons('stopped'); }
function clearTemporizador()  { resetState(); showButtons('init'); }

startBtn.addEventListener('click',   ()=> mode===MODES.CRONOMETRO ? startCronometro() : startTemporizador());
pauseBtn.addEventListener('click',   ()=> mode===MODES.CRONOMETRO ? pauseCronometro() : pauseTemporizador());
resumeBtn.addEventListener('click',  ()=> mode===MODES.CRONOMETRO ? resumeCronometro() : resumeTemporizador());
stopBtn.addEventListener('click',    ()=> mode===MODES.CRONOMETRO ? stopCronometro() : stopTemporizador());
clearBtn.addEventListener('click',   ()=> mode===MODES.CRONOMETRO ? clearCronometro() : clearTemporizador());
setTimerBtn.addEventListener('click',()=>{
  const min = parseInt(inputMinutes.value, 10) || 0;
  const sec = parseInt(inputSeconds.value, 10) || 0;
  if (min < 0 || sec < 0 || sec > 59) return alert('Introduce valores válidos.');
  countdownTotal = (min * 60 + sec) * 1000;
  updateDisplay(countdownTotal);
  showButtons('init');
});

// Inicialización
resetState(); showButtons('init'); switchMode(MODES.CRONOMETRO);
