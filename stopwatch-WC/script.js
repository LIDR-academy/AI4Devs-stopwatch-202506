document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const screens = {
        home: document.getElementById('homeScreen'),
        stopwatch: document.getElementById('stopwatchScreen'),
        countdown: document.getElementById('countdownScreen')
    };

    // Botones de Navegación
    const selectStopwatchBtn = document.getElementById('selectStopwatch');
    const selectCountdownBtn = document.getElementById('selectCountdown');
    const backButtons = document.querySelectorAll('.back-button');

    // Elementos del Cronómetro
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    const stopwatchMilliseconds = document.getElementById('stopwatchMilliseconds');
    const stopwatchStartStopBtn = document.getElementById('stopwatchStartStop');
    const stopwatchClearBtn = document.getElementById('stopwatchClear');

    // Elementos de la Cuenta Atrás
    const countdownDisplay = document.getElementById('countdownDisplay');
    const countdownMilliseconds = document.getElementById('countdownMilliseconds'); // <-- CAMBIO: Elemento añadido
    const countdownSetup = document.getElementById('countdownSetup');
    const countdownTimer = document.getElementById('countdownTimer');
    const keypad = document.getElementById('keypad');
    const countdownSetBtn = document.getElementById('countdownSet');
    const countdownClearInputBtn = document.getElementById('countdownClearInput');
    const countdownStartStopBtn = document.getElementById('countdownStartStop');
    const countdownClearTimerBtn = document.getElementById('countdownClearTimer');
    const alarmSound = document.getElementById('alarmSound');

    // --- VARIABLES DE ESTADO ---
    // Cronómetro
    let stopwatchInterval;
    let stopwatchIsRunning = false;
    let stopwatchElapsedTime = 0;
    let stopwatchStartTime = 0;

    // Cuenta Atrás
    let countdownInterval;
    let countdownIsRunning = false;
    let countdownInputString = "";
    let timeRemaining = 0;
    let countdownPauseTime = 0;


    // --- NAVEGACIÓN ENTRE PANTALLAS ---
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    selectStopwatchBtn.addEventListener('click', () => showScreen('stopwatch'));
    selectCountdownBtn.addEventListener('click', () => showScreen('countdown'));
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            resetStopwatch();
            resetCountdownFull();
            showScreen(button.dataset.target);
        });
    });

    // --- FUNCIÓN DE FORMATO UNIVERSAL ---
    function formatTime(time) {
        const ms = Math.floor((time % 1000));
        const secs = Math.floor((time / 1000) % 60);
        const mins = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor(time / (1000 * 60 * 60));

        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: mins.toString().padStart(2, '0'),
            seconds: secs.toString().padStart(2, '0'),
            milliseconds: ms.toString().padStart(3, '0') // Asegura 3 dígitos
        };
    }

    // --- LÓGICA DEL CRONÓMETRO (STOPWATCH) ---
    function updateStopwatchDisplay() {
        const currentTime = stopwatchIsRunning ? (Date.now() - stopwatchStartTime) + stopwatchElapsedTime : stopwatchElapsedTime;
        const formatted = formatTime(currentTime);
        stopwatchDisplay.textContent = `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`;
        stopwatchMilliseconds.textContent = formatted.milliseconds;
    }

    function toggleStopwatch() {
        if (stopwatchIsRunning) {
            clearInterval(stopwatchInterval);
            stopwatchElapsedTime += Date.now() - stopwatchStartTime;
            stopwatchStartStopBtn.textContent = 'Continue';
            stopwatchStartStopBtn.className = 'btn-start';
        } else {
            stopwatchStartTime = Date.now();
            stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
            stopwatchStartStopBtn.textContent = 'Stop';
            stopwatchStartStopBtn.className = 'btn-stop';
        }
        stopwatchIsRunning = !stopwatchIsRunning;
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchIsRunning = false;
        stopwatchElapsedTime = 0;
        stopwatchStartStopBtn.textContent = 'Start';
        stopwatchStartStopBtn.className = 'btn-start';
        updateStopwatchDisplay();
    }

    stopwatchStartStopBtn.addEventListener('click', toggleStopwatch);
    stopwatchClearBtn.addEventListener('click', resetStopwatch);


    // --- LÓGICA DE LA CUENTA ATRÁS (COUNTDOWN) ---
    function updateCountdownInputDisplay() {
        const padded = countdownInputString.padStart(6, '0');
        const h = padded.substring(0, 2);
        const m = padded.substring(2, 4);
        const s = padded.substring(4, 6);
        countdownDisplay.textContent = `${h}:${m}:${s}`;
        countdownMilliseconds.textContent = "000"; // <-- CAMBIO: Resetear milisegundos en la vista de entrada
    }

    keypad.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && countdownInputString.length < 6) {
            countdownInputString += e.target.dataset.key;
            updateCountdownInputDisplay();
        }
    });

    countdownClearInputBtn.addEventListener('click', () => {
        countdownInputString = "";
        updateCountdownInputDisplay();
    });

    countdownSetBtn.addEventListener('click', () => {
        if (countdownInputString === "") return;
        const padded = countdownInputString.padStart(6, '0');
        const h = parseInt(padded.substring(0, 2), 10);
        const m = parseInt(padded.substring(2, 4), 10);
        const s = parseInt(padded.substring(4, 6), 10);
        
        const totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds > 0) {
            timeRemaining = totalSeconds * 1000;
            updateCountdownTimerDisplay(timeRemaining);
            countdownSetup.style.display = 'none';
            countdownTimer.style.display = 'block';
            countdownStartStopBtn.textContent = 'Start';
            countdownStartStopBtn.className = 'btn-start';
            countdownStartStopBtn.style.display = 'inline-block';
        }
    });
    
    // <-- CAMBIO: Función de actualización unificada que usa formatTime
    function updateCountdownTimerDisplay(ms) {
        if (ms < 0) ms = 0;
        const formatted = formatTime(ms);
        countdownDisplay.textContent = `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`;
        countdownMilliseconds.textContent = formatted.milliseconds;
    }
    
    function tickCountdown() {
        const currentRemaining = timeRemaining - (Date.now() - countdownPauseTime);

        if (currentRemaining <= 0) {
            clearInterval(countdownInterval);
            countdownIsRunning = false;
            updateCountdownTimerDisplay(0); // Muestra 00:00:00 000
            
            alarmSound.currentTime = 0;
            alarmSound.play();
            setTimeout(() => alarmSound.pause(), 3000);

            countdownStartStopBtn.style.display = 'none';
        } else {
            updateCountdownTimerDisplay(currentRemaining);
        }
    }

    function toggleCountdown() {
        if (countdownIsRunning) { // Pausar
            clearInterval(countdownInterval);
            timeRemaining -= (Date.now() - countdownPauseTime);
            countdownStartStopBtn.textContent = 'Continue';
            countdownStartStopBtn.className = 'btn-start';
        } else { // Iniciar o continuar
            countdownPauseTime = Date.now();
            countdownInterval = setInterval(tickCountdown, 10); // <-- CAMBIO: Intervalo a 10ms
            
            countdownStartStopBtn.textContent = 'Stop';
            countdownStartStopBtn.className = 'btn-stop';
        }
        countdownIsRunning = !countdownIsRunning;
    }

    function resetCountdownFull() {
        clearInterval(countdownInterval);
        countdownIsRunning = false;
        countdownInputString = "";
        timeRemaining = 0;
        
        countdownSetup.style.display = 'block';
        countdownTimer.style.display = 'none';
        countdownStartStopBtn.style.display = 'inline-block';
        
        updateCountdownInputDisplay();
    }

    countdownStartStopBtn.addEventListener('click', toggleCountdown);
    countdownClearTimerBtn.addEventListener('click', resetCountdownFull);

    // Inicializar displays al cargar
    updateStopwatchDisplay();
    updateCountdownInputDisplay();
});