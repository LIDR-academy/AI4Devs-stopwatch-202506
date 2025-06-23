document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado. Inicializando la aplicación.');

    // --- Elementos del DOM ---
    // Cronómetro
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    const stopwatchStartBtn = document.getElementById('stopwatchStartBtn');
    const stopwatchStopBtn = document.getElementById('stopwatchStopBtn');
    const stopwatchResetBtn = document.getElementById('stopwatchResetBtn');

    // Cuenta Atrás
    const countdownHoursInput = document.getElementById('countdownHours');
    const countdownMinutesInput = document.getElementById('countdownMinutes');
    const countdownSecondsInput = document.getElementById('countdownSeconds');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const countdownStartBtn = document.getElementById('countdownStartBtn');
    const countdownPauseBtn = document.getElementById('countdownPauseBtn');
    const countdownResetBtn = document.getElementById('countdownResetBtn');
    const countdownAlert = document.getElementById('countdownAlert');
    const countdownInputWarning = document.getElementById('countdownInputWarning');

     /**
     * Clase para gestionar el cronómetro.
     * Implementa principios SOLID (SRP: Single Responsibility Principle).
     */
    class Stopwatch {
        constructor(displayElement) {
            this.displayElement = displayElement;
            this.interval = null;
            this.elapsedTime = 0; // En milisegundos
            this.startTime = 0;
            this.isRunning = false;
            console.log('Cronómetro inicializado.');
        }

        /**
         * Formatea un tiempo dado en milisegundos a HH:MM:SS:mmm.
         * @param {number} ms - Tiempo en milisegundos.
         * @returns {object} Un objeto con horas, minutos, segundos y milisegundos formateados.
         */
        static formatTime(ms) {
            const totalSeconds = Math.floor(ms / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const milliseconds = ms % 1000;

            const format = (num) => String(num).padStart(2, '0');
            const formatMs = (num) => String(num).padStart(3, '0');

            return {
                formattedTime: `${format(hours)}:${format(minutes)}:${format(seconds)}`,
                formattedMs: formatMs(milliseconds)
            };
        }

        /**
         * Actualiza la visualización del cronómetro.
         * @private
         */
        _updateDisplay() {
            try {
                const now = Date.now();
                if (this.isRunning) {
                    this.elapsedTime += (now - this.startTime);
                    this.startTime = now; // Actualizar startTime para el siguiente tick
                }
                const { formattedTime, formattedMs } = Stopwatch.formatTime(this.elapsedTime);
                this.displayElement.innerHTML = `${formattedTime}<span class="milliseconds-small">${formattedMs}</span>`;
            } catch (error) {
                console.error('Error al actualizar el display del cronómetro:', error);
            }
        }

        /**
         * Inicia o reanuda el cronómetro.
         */
        start() {
            if (this.isRunning) {
                console.log('Cronómetro ya está en marcha.');
                return;
            }
            this.isRunning = true;
            this.startTime = Date.now(); // Establecer el momento de inicio/reanudación
            this.interval = setInterval(() => this._updateDisplay(), 10); // Actualiza cada 10ms para milisegundos
            console.log('Cronómetro iniciado.');
        }

        /**
         * Detiene el cronómetro.
         */
        stop() {
            if (!this.isRunning) {
                console.log('Cronómetro ya está detenido.');
                return;
            }
            clearInterval(this.interval);
            this.isRunning = false;
            console.log('Cronómetro detenido.');
            // No resetear elapsedTime aquí para permitir reanudar
        }

        /**
         * Reinicia el cronómetro a cero.
         */
        reset() {
            this.stop(); // Detener primero
            this.elapsedTime = 0;
            this.startTime = 0;
            this.isRunning = false;
            this.displayElement.innerHTML = `00:00:00<span class="milliseconds-small">000</span>`;
            console.log('Cronómetro reiniciado.');
        }
    }

    /**
     * Clase para gestionar la cuenta atrás.
     * Implementa principios SOLID (SRP: Single Responsibility Principle).
     */
    class Countdown {
        constructor(displayElement, hoursInput, minutesInput, secondsInput, alertElement, warningElement) {
            this.displayElement = displayElement;
            this.hoursInput = hoursInput;
            this.minutesInput = minutesInput;
            this.secondsInput = secondsInput;
            this.alertElement = alertElement;
            this.warningElement = warningElement;
            this.interval = null;
            this.totalSeconds = 0; // Tiempo inicial en segundos
            this.remainingTime = 0; // Tiempo restante en segundos
            this.isPaused = false;
            this.isRunning = false;
            this.beepSound = new Audio('https://www.soundjay.com/buttons/beep-07.wav'); // URL de sonido de ejemplo
            console.log('Cuenta atrás inicializada.');
        }

        /**
         * Formatea un tiempo dado en segundos a HH:MM:SS.
         * @param {number} totalSeconds - Tiempo en segundos.
         * @returns {string} El tiempo formateado.
         */
        static formatTime(totalSeconds) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const format = (num) => String(num).padStart(2, '0');
            return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
        }

        /**
         * Establece el tiempo inicial de la cuenta atrás a partir de los inputs.
         * @returns {boolean} True si el tiempo es válido, false en caso contrario.
         */
        _setInitialTime() {
            try {
                const hours = parseInt(this.hoursInput.value) || 0;
                const minutes = parseInt(this.minutesInput.value) || 0;
                const seconds = parseInt(this.secondsInput.value) || 0;

                this.totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
                this.remainingTime = this.totalSeconds;

                if (this.totalSeconds <= 0) {
                    this.warningElement.classList.remove('d-none');
                    console.warn('Tiempo de cuenta atrás no válido: cero o negativo.');
                    return false;
                } else {
                    this.warningElement.classList.add('d-none');
                    this.alertElement.classList.add('d-none'); // Ocultar alerta si hay tiempo válido
                    this.displayElement.classList.remove('countdown-alert-active'); // Limpiar animación
                    this.displayElement.textContent = Countdown.formatTime(this.remainingTime);
                    console.log(`Tiempo inicial de cuenta atrás establecido a ${this.totalSeconds} segundos.`);
                    return true;
                }
            } catch (error) {
                console.error('Error al establecer el tiempo inicial de la cuenta atrás:', error);
                this.warningElement.classList.remove('d-none');
                return false;
            }
        }

        /**
         * Actualiza la visualización de la cuenta atrás.
         * @private
         */
        _updateDisplay() {
            try {
                if (this.remainingTime <= 0) {
                    this.stop();
                    this.displayElement.textContent = '00:00:00';
                    this.alertElement.classList.remove('d-none'); // Mostrar alerta
                    this.displayElement.classList.add('countdown-alert-active'); // Activar animación
                    this.beepSound.play().catch(e => console.error("Error al reproducir el sonido:", e));
                    console.log('Cuenta atrás finalizada.');
                } else {
                    this.displayElement.textContent = Countdown.formatTime(this.remainingTime);
                    this.remainingTime--;
                }
            } catch (error) {
                console.error('Error al actualizar el display de la cuenta atrás:', error);
            }
        }

        /**
         * Inicia la cuenta atrás.
         */
        start() {
            if (this.isRunning && !this.isPaused) {
                console.log('Cuenta atrás ya está en marcha.');
                return;
            }

            if (!this.isPaused) { // Si no está pausada, establecer tiempo inicial
                if (!this._setInitialTime()) {
                    return; // No iniciar si el tiempo no es válido
                }
            }

            this.isRunning = true;
            this.isPaused = false;
            this.alertElement.classList.add('d-none'); // Asegurarse de que la alerta esté oculta
            this.displayElement.classList.remove('countdown-alert-active'); // Limpiar animación

            this.interval = setInterval(() => this._updateDisplay(), 1000);
            console.log('Cuenta atrás iniciada/reanudada.');
        }

        /**
         * Pausa la cuenta atrás.
         */
        pause() {
            if (!this.isRunning) {
                console.log('Cuenta atrás no está en marcha.');
                return;
            }
            clearInterval(this.interval);
            this.isRunning = false;
            this.isPaused = true;
            console.log('Cuenta atrás pausada.');
        }

        /**
         * Reinicia la cuenta atrás a su tiempo inicial.
         */
        reset() {
            clearInterval(this.interval);
            this.isRunning = false;
            this.isPaused = false;
            this.totalSeconds = 0; // Resetear el tiempo total
            this.remainingTime = 0;
            this.hoursInput.value = '0';
            this.minutesInput.value = '0';
            this.secondsInput.value = '0';
            this.displayElement.textContent = '00:00:00';
            this.alertElement.classList.add('d-none'); // Ocultar alerta
            this.warningElement.classList.add('d-none'); // Ocultar warning
            this.displayElement.classList.remove('countdown-alert-active'); // Limpiar animación
            console.log('Cuenta atrás reiniciada.');
        }

        /**
         * Detiene la cuenta atrás completamente (sin reanudar).
         * Utilizado internamente al finalizar el tiempo.
         * @private
         */
        stop() {
            clearInterval(this.interval);
            this.isRunning = false;
            this.isPaused = false;
            console.log('Cuenta atrás detenida al finalizar.');
        }
    }

    // --- Instanciación de las clases ---
    const stopwatch = new Stopwatch(stopwatchDisplay);
    const countdown = new Countdown(countdownDisplay, countdownHoursInput, countdownMinutesInput, countdownSecondsInput, countdownAlert, countdownInputWarning);

    // --- Event Listeners para el Cronómetro ---
    stopwatchStartBtn.addEventListener('click', () => {
        try {
            stopwatch.start();
        } catch (error) {
            console.error('Error al hacer clic en Iniciar cronómetro:', error);
        }
    });

    stopwatchStopBtn.addEventListener('click', () => {
        try {
            stopwatch.stop();
        } catch (error) {
            console.error('Error al hacer clic en Detener cronómetro:', error);
        }
    });

    stopwatchResetBtn.addEventListener('click', () => {
        try {
            stopwatch.reset();
        } catch (error) {
            console.error('Error al hacer clic en Reiniciar cronómetro:', error);
        }
    });

    // --- Event Listeners para la Cuenta Atrás ---
    countdownStartBtn.addEventListener('click', () => {
        try {
            countdown.start();
        } catch (error) {
            console.error('Error al hacer clic en Iniciar cuenta atrás:', error);
        }
    });

    countdownPauseBtn.addEventListener('click', () => {
        try {
            countdown.pause();
        } catch (error) {
            console.error('Error al hacer clic en Pausar cuenta atrás:', error);
        }
    });

    countdownResetBtn.addEventListener('click', () => {
        try {
            countdown.reset();
        } catch (error) {
            console.error('Error al hacer clic en Reiniciar cuenta atrás:', error);
        }
    });

    // Validar y limitar inputs de tiempo para la cuenta atrás
    [countdownHoursInput, countdownMinutesInput, countdownSecondsInput].forEach(input => {
        input.addEventListener('input', (event) => {
            let value = parseInt(event.target.value);
            if (isNaN(value) || value < 0) {
                event.target.value = 0;
                value = 0;
            }

            if (event.target.id === 'countdownMinutes' || event.target.id === 'countdownSeconds') {
                if (value > 59) {
                    event.target.value = 59;
                }
            }
            // Limpiar warnings al modificar los inputs si el tiempo era inválido
            countdownInputWarning.classList.add('d-none');
        });
    });

    console.log('Event listeners configurados.');
});