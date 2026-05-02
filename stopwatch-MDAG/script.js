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
    let totalSeconds = Math.floor(ms / 1000);
    let m = Math.floor(totalSeconds / 60);
    let s = totalSeconds % 60;
    let cs = Math.floor((ms % 1000) / 10);
    let msStr = String(cs).padStart(2, '0');
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${msStr}`;
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
let cdTime = 0;
let cdRunning = false;
let cdEndTime = 0;

const cdInputs = document.getElementById('cd-inputs');
const cdDisplay = document.getElementById('countdown-display');
const cdMin = document.getElementById('cd-min');
const cdSec = document.getElementById('cd-sec');
const cdFinishedMsg = document.getElementById('cd-finished');

function updateCdDisplay(seconds) {
    let m = String(Math.floor(seconds / 60)).padStart(2, '0');
    let s = String(seconds % 60).padStart(2, '0');
    cdDisplay.textContent = `${m}:${s}`;
}

document.getElementById('cd-start').addEventListener('click', () => {
    if (!cdRunning) {
        if (cdTime === 0) {
            let m = Math.max(0, parseInt(cdMin.value) || 0);
            let s = Math.min(59, Math.max(0, parseInt(cdSec.value) || 0));
            cdTime = (m * 60) + s;
            
            cdMin.value = m;
            cdSec.value = s;
        }
        
        if (cdTime > 0) {
            cdRunning = true;
            cdEndTime = Date.now() + cdTime * 1000;
            
            cdInputs.style.display = 'none';
            cdDisplay.style.display = 'block';
            cdFinishedMsg.style.display = 'none';
            updateCdDisplay(cdTime);

            cdInterval = setInterval(() => {
                const remaining = Math.max(0, Math.round((cdEndTime - Date.now()) / 1000));
                cdTime = remaining;
                updateCdDisplay(remaining);
                
                if (remaining <= 0) {
                    clearInterval(cdInterval);
                    cdRunning = false;
                    cdFinishedMsg.style.display = 'block';
                    cdInputs.style.display = 'flex';
                    cdDisplay.style.display = 'none';
                }
            }, 500);
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
    
    cdInputs.style.display = 'flex';
    cdDisplay.style.display = 'none';
    cdFinishedMsg.style.display = 'none';
});