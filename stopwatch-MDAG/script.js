// --- LÓGICA DE PESTAÑAS (TABS) ---
const tabSw = document.getElementById('tab-stopwatch');
const tabCd = document.getElementById('tab-countdown');
const secSw = document.getElementById('stopwatch-section');
const secCd = document.getElementById('countdown-section');

tabSw.addEventListener('click', () => {
    tabSw.classList.add('active');
    tabCd.classList.remove('active');
    secSw.classList.add('active');
    secCd.classList.remove('active');
});

tabCd.addEventListener('click', () => {
    tabCd.classList.add('active');
    tabSw.classList.remove('active');
    secCd.classList.add('active');
    secSw.classList.remove('active');
});


// --- LÓGICA DEL CRONÓMETRO ---
let swInterval;
let swTime = 0;
let swRunning = false;
let swStartTime;

const swDisplay = document.getElementById('stopwatch-display');

function formatSwTime(ms) {
    let date = new Date(ms);
    let m = String(date.getUTCMinutes()).padStart(2, '0');
    let s = String(date.getUTCSeconds()).padStart(2, '0');
    let msStr = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${m}:${s}:${msStr}`;
}

document.getElementById('sw-start').addEventListener('click', () => {
    if (!swRunning) {
        swRunning = true;
        swStartTime = Date.now() - swTime;
        swInterval = setInterval(() => {
            swTime = Date.now() - swStartTime;
            swDisplay.textContent = formatSwTime(swTime);
        }, 10);
    }
});

document.getElementById('sw-stop').addEventListener('click', () => {
    swRunning = false;
    clearInterval(swInterval);
});

document.getElementById('sw-reset').addEventListener('click', () => {
    swRunning = false;
    clearInterval(swInterval);
    swTime = 0;
    swDisplay.textContent = "00:00:00";
});


// --- LÓGICA DE LA CUENTA ATRÁS ---
let cdInterval;
let cdTime = 0; // Tiempo en segundos
let cdRunning = false;

const cdInputs = document.getElementById('cd-inputs');
const cdDisplay = document.getElementById('countdown-display');
const cdMin = document.getElementById('cd-min');
const cdSec = document.getElementById('cd-sec');

function updateCdDisplay(seconds) {
    let m = String(Math.floor(seconds / 60)).padStart(2, '0');
    let s = String(seconds % 60).padStart(2, '0');
    cdDisplay.textContent = `${m}:${s}`;
}

document.getElementById('cd-start').addEventListener('click', () => {
    if (!cdRunning) {
        // Solo tomar valores de los inputs si recién empezamos
        if (cdTime === 0) {
            let m = parseInt(cdMin.value) || 0;
            let s = parseInt(cdSec.value) || 0;
            cdTime = (m * 60) + s;
        }
        
        if (cdTime > 0) {
            cdRunning = true;
            // Ocultar inputs y mostrar los números fijos
            cdInputs.style.display = 'none';
            cdDisplay.style.display = 'block';
            updateCdDisplay(cdTime);

            cdInterval = setInterval(() => {
                cdTime--;
                updateCdDisplay(cdTime);
                
                // Cuando llega a cero
                if (cdTime <= 0) {
                    clearInterval(cdInterval);
                    cdRunning = false;
                    setTimeout(() => alert("¡El tiempo ha terminado!"), 50); // Pequeño delay para que pinte el 00:00
                    cdInputs.style.display = 'flex';
                    cdDisplay.style.display = 'none';
                }
            }, 1000);
        }
    }
});

document.getElementById('cd-stop').addEventListener('click', () => {
    cdRunning = false;
    clearInterval(cdInterval);
});

document.getElementById('cd-reset').addEventListener('click', () => {
    cdRunning = false;
    clearInterval(cdInterval);
    cdTime = 0;
    cdMin.value = '';
    cdSec.value = '';
    
    // Volver a mostrar los inputs para ingresar un nuevo tiempo
    cdInputs.style.display = 'flex';
    cdDisplay.style.display = 'none';
});
