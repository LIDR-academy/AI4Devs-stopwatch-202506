/**
 * @file script.js
 * @description L_gica principal para la aplicaci_n de temporizadores.
 * @author Gemini AI Expert Developer
 * @date 2025-06-22
 */

// Se espera a que todo el contenido del DOM est_ cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * UIManager (Single Responsibility Principle)
     * Clase responsable _nicamente de las interacciones con el DOM.
     * No contiene l_gica de negocio (c_mo funciona un cron_metro o cuenta atr_s).
     */
    class UIManager {
        constructor() {
            // Mapeo de todos los elementos del DOM con los que interactuaremos.
            this.elements = {
                screens: {
                    main: document.getElementById('main-screen'),
                    stopwatch: document.getElementById('stopwatch-screen'),
                    countdown: document.getElementById('countdown-screen'),
                },
                buttons: {
                    showStopwatch: document.getElementById('show-stopwatch-btn'),
                    showCountdown: document.getElementById('show-countdown-btn'),
                    backToMain: document.querySelectorAll('.back-to-main'),
                    stopwatchStartPause: document.getElementById('stopwatch-start-pause'),
                    stopwatchClear: document.getElementById('stopwatch-clear'),
                    countdownStartPause: document.getElementById('countdown-start-pause'),
                    countdownStop: document.getElementById('countdown-stop'),
                    countdownClear: document.getElementById('countdown-clear'),
                },
                displays: {
                    stopwatch: document.getElementById('stopwatch-display'),
                    countdown: document.getElementById('countdown-display'),
                    countdownInput: document.getElementById('countdown-input-display'),
                },
                errorMessages: {
                  countdown: document.getElementById('countdown-error'),  
                },
                confettiCanvas: document.getElementById('confetti-canvas'),
            };
            
            this.confetti = confetti.create(this.elements.confettiCanvas, {
                resize: true,
                useWorker: true
            });
        }

        /**
         * Muestra una pantalla espec_fica y oculta las dem_s.
         * @param {string} screenName - El nombre de la pantalla a mostrar ('main', 'stopwatch', 'countdown').
         */
        showScreen(screenName) {
            Object.values(this.elements.screens).forEach(screen => {
                screen.classList.remove('active');
            });
            if (this.elements.screens[screenName]) {
                this.elements.screens[screenName].classList.add('active');
            }
        }

        /**
         * Actualiza el contenido de un display de tiempo.
         * @param {HTMLElement} displayElement - El elemento del DOM a actualizar.
         * @param {string} formattedTime - El tiempo formateado como "HH:MM:SS".
         * @param {string} milliseconds - Los milisegundos formateados como ".ms".
         */
        updateTimerDisplay(displayElement, formattedTime, milliseconds) {
            // Ajustamos el tama_o de la fuente para que ocupe ~50% del alto de la ventana.
            // Se usa min() para evitar que sea excesivamente grande en pantallas muy altas.
            displayElement.style.fontSize = `min(50vh, ${15}vw)`;
            
            displayElement.innerHTML = `${formattedTime}<span class="milliseconds">.${milliseconds}</span>`;
        }
        
        /**
         * Lanza una animaci_n de confeti.
         */
        triggerConfetti() {
            this.confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });
        }
        
        /**
         * Muestra u oculta elementos en la pantalla de cuenta atr_s.
         * @param {boolean} showTimer - Si es true, muestra el contador; si es false, muestra el input.
         */
        toggleCountdownDisplay(showTimer) {
            this.elements.displays.countdown.classList.toggle('d-none', !showTimer);
            this.elements.displays.countdownInput.parentElement.classList.toggle('d-none', showTimer);
            if (!showTimer) this.clearError('countdown');
        }

        /**
         * Muestra un mensaje de error.
         * @param {string} context - El contexto del error ('countdown').
         * @param {string} message - El mensaje a mostrar.
         */
        showError(context, message) {
            this.elements.errorMessages[context].textContent = message;
        }

        /**
         * Limpia un mensaje de error.
         * @param {string} context - El contexto del error ('countdown').
         */
        clearError(context) {
            this.elements.errorMessages[context].textContent = '';
        }
    }

    /**
     * Clase base para temporizadores (para futura extensi_n, siguiendo Open/Closed Principle)
     * Contiene la l_gica com_n de formateo de tiempo.
     */
    class Timer {
        /**
         * Formatea el tiempo en milisegundos a HH:MM:SS.
         * @param {number} time - Tiempo total en milisegundos.
         * @returns {{formattedTime: string, milliseconds: string}}
         */
        formatTime(time) {
            const ms = Math.floor(time % 1000);
            const totalSeconds = Math.floor(time / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            return {
                formattedTime: 
                    `${String(hours).padStart(2, '0')}:` +
                    `${String(minutes).padStart(2, '0')}:` +
                    `${String(seconds).padStart(2, '0')}`,
                milliseconds: String(ms).padStart(3, '0')
            };
        }
    }


    /**
     * Stopwatch (Single Responsibility Principle)
     * Gestiona toda la l_gica del cron_metro.
     */
    class Stopwatch extends Timer {
        constructor(uiManager) {
            super();
            this.uiManager = uiManager;
            this.isRunning = false;
            this.interval = null;
            this.elapsedTime = 0;
            this.startTime = 0;
            this.displayElement = this.uiManager.elements.displays.stopwatch;
            this.startPauseButton = this.uiManager.elements.buttons.stopwatchStartPause;
        }

        /**
         * Inicia, pausa o contin_a el cron_metro.
         */
        toggle() {
            if (this.isRunning) {
                this.pause();
            } else {
                this.start();
            }
        }
        
        start() {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.interval = setInterval(() => this.update(), 10); // Actualiza cada 10ms
            this.startPauseButton.textContent = 'Pausar';
            this.startPauseButton.classList.replace('btn-primary', 'btn-warning');
        }

        pause() {
            this.isRunning = false;
            clearInterval(this.interval);
            this.elapsedTime = Date.now() - this.startTime;
            this.startPauseButton.textContent = 'Continuar';
            this.startPauseButton.classList.replace('btn-warning', 'btn-success');
        }
        
        update() {
            this.elapsedTime = Date.now() - this.startTime;
            const { formattedTime, milliseconds } = this.formatTime(this.elapsedTime);
            this.uiManager.updateTimerDisplay(this.displayElement, formattedTime, milliseconds);
        }

        /**
         * Limpia y resetea el cron_metro.
         */
        clear() {
            this.isRunning = false;
            clearInterval(this.interval);
            this.elapsedTime = 0;
            const { formattedTime, milliseconds } = this.formatTime(0);
            this.uiManager.updateTimerDisplay(this.displayElement, formattedTime, milliseconds);
            this.startPauseButton.textContent = 'Iniciar';
            this.startPauseButton.classList.remove('btn-warning', 'btn-success');
            this.startPauseButton.classList.add('btn-primary');
        }
    }
    
    /**
     * Countdown (Single Responsibility Principle)
     * Gestiona la l_gica de la cuenta atr_s.
     */
    class Countdown extends Timer {
        constructor(uiManager) {
            super();
            this.uiManager = uiManager;
            
            // Estado del temporizador
            this.isRunning = false;
            this.isPaused = false;
            this.interval = null;
            this.timeLeft = 0; // Tiempo restante en ms
            this.initialTime = 0; // Tiempo inicial configurado por el usuario en ms
            
            // Estado del input
            this.inputDigits = ''; // Cadena de d_gitos p.ej. '011530' para 01:15:30

            // Elementos del DOM
            this.displayElement = this.uiManager.elements.displays.countdown;
            this.inputElement = this.uiManager.elements.displays.countdownInput;
            this.startPauseButton = this.uiManager.elements.buttons.countdownStartPause;
            this.stopButton = this.uiManager.elements.buttons.countdownStop;
        }
        
        /**
         * Maneja la entrada de teclado en el 'input' personalizado.
         * @param {KeyboardEvent} e - El evento de teclado.
         */
        handleKeydown(e) {
            if (/\d/.test(e.key) && this.inputDigits.length < 6) {
                this.inputDigits += e.key;
            } else if (e.key === 'Backspace') {
                this.inputDigits = this.inputDigits.slice(0, -1);
            }
            this.updateInputDisplay();
            this.validateAndSetTime();
        }
        
        /**
         * Actualiza el contenido visual del 'input'.
         */
        updateInputDisplay() {
            const padded = this.inputDigits.padEnd(6, '0');
            const hh = padded.substring(0, 2);
            const mm = padded.substring(2, 4);
            const ss = padded.substring(4, 6);
            this.inputElement.textContent = `${hh}:${mm}:${ss}`;
        }
        
        /**
         * Valida, corrige el tiempo y lo establece como tiempo inicial.
         * Ej: 99 segundos se convierten en 1 minuto y 39 segundos.
         */
        validateAndSetTime() {
            this.uiManager.clearError('countdown');
            if (this.inputDigits.length === 0) {
                this.initialTime = 0;
                this.startPauseButton.disabled = true;
                return;
            }

            const padded = this.inputDigits.padEnd(6, '0');
            let h = parseInt(padded.substring(0, 2), 10);
            let m = parseInt(padded.substring(2, 4), 10);
            let s = parseInt(padded.substring(4, 6), 10);

            // Correcci_n de tiempo
            if (s >= 60) {
                m += Math.floor(s / 60);
                s %= 60;
            }
            if (m >= 60) {
                h += Math.floor(m / 60);
                m %= 60;
            }
            
            // Mostrar una advertencia si el tiempo fue corregido
            const originalTime = this.inputElement.textContent;
            const correctedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            if(originalTime !== correctedTime) {
                this.uiManager.showError('countdown', `Tiempo corregido a: ${correctedTime}`);
            }

            this.initialTime = (h * 3600 + m * 60 + s) * 1000;
            
            this.startPauseButton.disabled = this.initialTime === 0;
        }

        /**
         * Inicia o pausa la cuenta atr_s.
         */
        toggle() {
            if (this.isRunning) {
                this.pause();
            } else {
                this.start();
            }
        }

        start() {
            if(this.initialTime <= 0) return;
            
            if(!this.isPaused) { // Si es un inicio nuevo
                this.timeLeft = this.initialTime;
            }

            this.isRunning = true;
            this.isPaused = false;
            this.uiManager.toggleCountdownDisplay(true);
            const startTime = Date.now();
            
            this.interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newTimeLeft = (this.isPaused ? this.timeLeft : this.initialTime) - elapsed;

                if (newTimeLeft <= 0) {
                    this.timeLeft = 0;
                    this.finish();
                } else {
                    this.timeLeft = newTimeLeft;
                    this.updateDisplay();
                }
            }, 10);

            this.startPauseButton.textContent = 'Pausar';
            this.startPauseButton.classList.replace('btn-primary', 'btn-warning');
            this.stopButton.disabled = false;
        }

        pause() {
            this.isRunning = false;
            this.isPaused = true;
            clearInterval(this.interval);
            // El tiempo restante (this.timeLeft) ya est_ actualizado.
            this.startPauseButton.textContent = 'Continuar';
            this.startPauseButton.classList.replace('btn-warning', 'btn-success');
        }

        /**
         * Detiene la cuenta atr_s y la resetea al valor inicial.
         */
        stop() {
            clearInterval(this.interval);
            this.isRunning = false;
            this.isPaused = false;
            this.timeLeft = this.initialTime;
            this.updateDisplay(); // Muestra el tiempo final (que es el inicial)
            
            // Cambia los botones a su estado inicial
            this.startPauseButton.textContent = 'Iniciar';
            this.startPauseButton.classList.remove('btn-warning', 'btn-success');
            this.startPauseButton.classList.add('btn-primary');
            this.stopButton.disabled = true;
        }

        /**
         * Se ejecuta al finalizar la cuenta atr_s.
         */
        finish() {
            clearInterval(this.interval);
            this.isRunning = false;
            this.isPaused = false;
            this.updateDisplay(); // Muestra 00:00:00.000
            this.uiManager.triggerConfetti();
            
            // Resetea los botones
            this.startPauseButton.textContent = 'Iniciar';
            this.startPauseButton.classList.remove('btn-warning', 'btn-success');
            this.startPauseButton.classList.add('btn-primary');
            this.startPauseButton.disabled = false;
            this.stopButton.disabled = true;
        }
        
        updateDisplay() {
            const { formattedTime, milliseconds } = this.formatTime(this.timeLeft);
            this.uiManager.updateTimerDisplay(this.displayElement, formattedTime, milliseconds);
        }
        
        /**
         * Limpia todo y vuelve a la pantalla de input.
         */
        clear() {
            this.stop(); // Detiene cualquier operaci_n
            this.initialTime = 0;
            this.timeLeft = 0;
            this.inputDigits = '';
            this.updateInputDisplay();
            this.uiManager.toggleCountdownDisplay(false); // Muestra el input
            this.startPauseButton.disabled = true;
            this.stopButton.disabled = true;
        }
    }


    /**
     * App (Clase Principal)
     * Orquesta la aplicaci_n, inicializa los m_dulos y conecta los eventos.
     */
    class App {
        constructor() {
            this.uiManager = new UIManager();
            this.stopwatch = new Stopwatch(this.uiManager);
            this.countdown = new Countdown(this.uiManager);
            this.bindEvents();
        }

        /**
         * Conecta todos los event listeners a sus funciones correspondientes.
         */
        bindEvents() {
            // Navegaci_n
            this.uiManager.elements.buttons.showStopwatch.addEventListener('click', () => this.uiManager.showScreen('stopwatch'));
            this.uiManager.elements.buttons.showCountdown.addEventListener('click', () => this.uiManager.showScreen('countdown'));
            this.uiManager.elements.buttons.backToMain.forEach(btn => {
                btn.addEventListener('click', () => this.uiManager.showScreen('main'));
            });

            // Cron_metro
            this.uiManager.elements.buttons.stopwatchStartPause.addEventListener('click', () => this.stopwatch.toggle());
            this.uiManager.elements.buttons.stopwatchClear.addEventListener('click', () => this.stopwatch.clear());
            
            // Cuenta Atr_s
            this.uiManager.elements.displays.countdownInput.addEventListener('keydown', (e) => this.countdown.handleKeydown(e));
            this.uiManager.elements.displays.countdownInput.addEventListener('blur', () => this.countdown.validateAndSetTime());
            this.uiManager.elements.buttons.countdownStartPause.addEventListener('click', () => this.countdown.toggle());
            this.uiManager.elements.buttons.countdownStop.addEventListener('click', () => this.countdown.stop());
            this.uiManager.elements.buttons.countdownClear.addEventListener('click', () => this.countdown.clear());
        }
    }

    // Inicializar la aplicaci_n.
    new App();
});
