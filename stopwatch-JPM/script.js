// Cronómetro variables
let stopwatchRunning = false;
let stopwatchStartTime = 0;
let stopwatchElapsedTime = 0;
let stopwatchInterval = null;
let lapCounter = 0;

// Timer variables
let timerRunning = false;
let timerTotalTime = 0;
let timerRemainingTime = 0;
let timerInterval = null;

// DOM Elements - Cronómetro
const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchStartIcon = document.getElementById('stopwatch-start-icon');
const stopwatchLapBtn = document.getElementById('stopwatch-lap');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const lapsContainer = document.getElementById('laps-container');
const startLabel = document.getElementById('start-label');

// DOM Elements - Timer
const timerDisplay = document.getElementById('timer-display');
const timerStartBtn = document.getElementById('timer-start');
const timerStartIcon = document.getElementById('timer-start-icon');
const timerCancelBtn = document.getElementById('timer-cancel');
const timerHours = document.getElementById('timer-hours');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const presetButtons = document.querySelectorAll('.btn-preset');

// Utilidades de formato de tiempo
function formatStopwatchTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

function formatTimerTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ===== FUNCIONES DEL CRONÓMETRO =====

function updateStopwatchDisplay() {
    const currentTime = stopwatchRunning ? Date.now() - stopwatchStartTime + stopwatchElapsedTime : stopwatchElapsedTime;
    stopwatchDisplay.textContent = formatStopwatchTime(currentTime);
}

function startStopwatch() {
    if (!stopwatchRunning) {
        // Iniciar cronómetro
        stopwatchRunning = true;
        stopwatchStartTime = Date.now();
        stopwatchInterval = setInterval(updateStopwatchDisplay, 10); // Actualizar cada 10ms para los centisegundos
        
        // Cambiar UI
        stopwatchStartIcon.className = 'bi bi-pause-fill';
        stopwatchStartBtn.className = 'btn btn-control btn-pause';
        startLabel.textContent = 'Pausar';
        stopwatchLapBtn.disabled = false;
    } else {
        // Pausar cronómetro
        stopwatchRunning = false;
        stopwatchElapsedTime += Date.now() - stopwatchStartTime;
        clearInterval(stopwatchInterval);
        
        // Cambiar UI
        stopwatchStartIcon.className = 'bi bi-play-fill';
        stopwatchStartBtn.className = 'btn btn-control btn-start';
        startLabel.textContent = 'Iniciar';
        stopwatchLapBtn.disabled = true;
    }
}

function resetStopwatch() {
    stopwatchRunning = false;
    stopwatchElapsedTime = 0;
    stopwatchStartTime = 0;
    lapCounter = 0;
    clearInterval(stopwatchInterval);
    
    // Resetear UI
    updateStopwatchDisplay();
    stopwatchStartIcon.className = 'bi bi-play-fill';
    stopwatchStartBtn.className = 'btn btn-control btn-start';
    startLabel.textContent = 'Iniciar';
    stopwatchLapBtn.disabled = true;
    
    // Limpiar vueltas
    lapsContainer.innerHTML = '';
}

function addLap() {
    if (stopwatchRunning) {
        lapCounter++;
        const currentTime = Date.now() - stopwatchStartTime + stopwatchElapsedTime;
        const lapTime = formatStopwatchTime(currentTime);
        
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `
            <span><strong>Vuelta ${lapCounter}</strong></span>
            <span>${lapTime}</span>
        `;
        
        lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
    }
}

// ===== FUNCIONES DEL TIMER =====

function updateTimerDisplay() {
    timerDisplay.textContent = formatTimerTime(timerRemainingTime);
}

function updateTimerFromInputs() {
    if (!timerRunning) {
        const hours = parseInt(timerHours.value) || 0;
        const minutes = parseInt(timerMinutes.value) || 0;
        const seconds = parseInt(timerSeconds.value) || 0;
        
        timerTotalTime = hours * 3600 + minutes * 60 + seconds;
        timerRemainingTime = timerTotalTime;
        updateTimerDisplay();
    }
}

function startTimer() {
    if (!timerRunning) {
        // Verificar que hay tiempo configurado
        if (timerRemainingTime <= 0) {
            alert('Por favor, configura un tiempo válido para el timer.');
            return;
        }
        
        // Iniciar timer
        timerRunning = true;
        timerInterval = setInterval(() => {
            timerRemainingTime--;
            updateTimerDisplay();
            
            if (timerRemainingTime <= 0) {
                // Timer terminado
                clearInterval(timerInterval);
                timerRunning = false;
                
                // Cambiar UI
                timerStartIcon.className = 'bi bi-play-fill';
                timerStartBtn.className = 'btn btn-control btn-start';
                
                // Notificación de finalización
                alert('¡Tiempo terminado!');
                
                // Opcional: sonido de notificación
                try {
                    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaBiuAzu3PfCkGMH3J8N2PQAcNhMDz4YW6kcTouc0fGwkLXJvmuIo4CAhMzMrYoGIsCSJ/xunUeEYLQMrN2oVNFQw=');
                    audio.play();
                } catch (e) {
                    console.log('No se pudo reproducir el sonido de notificación');
                }
            }
        }, 1000);
        
        // Cambiar UI
        timerStartIcon.className = 'bi bi-pause-fill';
        timerStartBtn.className = 'btn btn-control btn-pause';
        
    } else {
        // Pausar timer
        timerRunning = false;
        clearInterval(timerInterval);
        
        // Cambiar UI
        timerStartIcon.className = 'bi bi-play-fill';
        timerStartBtn.className = 'btn btn-control btn-start';
    }
}

function cancelTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    
    // Resetear tiempo
    timerRemainingTime = 0;
    timerTotalTime = 0;
    
    // Resetear inputs
    timerHours.value = 0;
    timerMinutes.value = 0;
    timerSeconds.value = 0;
    
    // Resetear UI
    updateTimerDisplay();
    timerStartIcon.className = 'bi bi-play-fill';
    timerStartBtn.className = 'btn btn-control btn-start';
}

function setPresetTime(minutes) {
    if (!timerRunning) {
        timerHours.value = 0;
        timerMinutes.value = minutes;
        timerSeconds.value = 0;
        updateTimerFromInputs();
    }
}

// ===== EVENT LISTENERS =====

// Cronómetro
stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);
stopwatchLapBtn.addEventListener('click', addLap);

// Timer
timerStartBtn.addEventListener('click', startTimer);
timerCancelBtn.addEventListener('click', cancelTimer);

// Inputs del timer
timerHours.addEventListener('input', updateTimerFromInputs);
timerMinutes.addEventListener('input', updateTimerFromInputs);
timerSeconds.addEventListener('input', updateTimerFromInputs);

// Botones de preconfiguración
presetButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const minutes = parseInt(e.target.getAttribute('data-minutes'));
        setPresetTime(minutes);
    });
});

// Validación de inputs del timer
timerHours.addEventListener('blur', function() {
    if (this.value < 0) this.value = 0;
    if (this.value > 23) this.value = 23;
});

timerMinutes.addEventListener('blur', function() {
    if (this.value < 0) this.value = 0;
    if (this.value > 59) this.value = 59;
});

timerSeconds.addEventListener('blur', function() {
    if (this.value < 0) this.value = 0;
    if (this.value > 59) this.value = 59;
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateStopwatchDisplay();
    updateTimerDisplay();
    
    // Limpiar cualquier interval que pueda estar corriendo
    if (stopwatchInterval) clearInterval(stopwatchInterval);
    if (timerInterval) clearInterval(timerInterval);
});
