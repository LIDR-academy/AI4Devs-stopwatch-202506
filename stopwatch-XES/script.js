class Timer {
    constructor() {
        this.stopwatchTime = 0;
        this.countdownTime = 300; // 5 minutes default
        this.stopwatchInterval = null;
        this.countdownInterval = null;
        this.isStopwatchRunning = false;
        this.isCountdownRunning = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplays();
    }

    initializeElements() {
        this.stopwatchDisplay = document.getElementById('stopwatch-display');
        this.countdownDisplay = document.getElementById('countdown-display');
        this.stopwatchIcon = document.getElementById('stopwatch-icon');
        this.countdownIcon = document.getElementById('countdown-icon');
        
        this.stopwatchStartBtn = document.getElementById('stopwatch-start');
        this.stopwatchStopBtn = document.getElementById('stopwatch-stop');
        this.stopwatchResetBtn = document.getElementById('stopwatch-reset');
        
        this.countdownStartBtn = document.getElementById('countdown-start');
        this.countdownStopBtn = document.getElementById('countdown-stop');
        this.countdownResetBtn = document.getElementById('countdown-reset');
        
        this.hoursInput = document.getElementById('hours-input');
        this.minutesInput = document.getElementById('minutes-input');
        this.secondsInput = document.getElementById('seconds-input');
    }

    attachEventListeners() {
        // Stopwatch controls
        this.stopwatchStartBtn.addEventListener('click', () => this.startStopwatch());
        this.stopwatchStopBtn.addEventListener('click', () => this.stopStopwatch());
        this.stopwatchResetBtn.addEventListener('click', () => this.resetStopwatch());
        this.stopwatchIcon.addEventListener('click', () => this.toggleStopwatch());

        // Countdown controls
        this.countdownStartBtn.addEventListener('click', () => this.startCountdown());
        this.countdownStopBtn.addEventListener('click', () => this.stopCountdown());
        this.countdownResetBtn.addEventListener('click', () => this.resetCountdown());
        this.countdownIcon.addEventListener('click', () => this.toggleCountdown());

        // Input changes
        [this.hoursInput, this.minutesInput, this.secondsInput].forEach(input => {
            input.addEventListener('input', () => this.updateCountdownFromInputs());
        });

        // Fullscreen button
        document.querySelector('.fullscreen-btn').addEventListener('click', () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        });
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }

    updateDisplays() {
        this.stopwatchDisplay.textContent = this.formatTime(this.stopwatchTime);
        this.countdownDisplay.textContent = this.formatTime(this.countdownTime);
    }

    // Stopwatch methods
    startStopwatch() {
        if (this.isStopwatchRunning) return;
        
        this.isStopwatchRunning = true;
        this.stopwatchIcon.classList.add('running');
        this.stopwatchStartBtn.textContent = 'Running...';
        this.stopwatchStartBtn.disabled = true;
        
        this.stopwatchInterval = setInterval(() => {
            this.stopwatchTime++;
            this.updateDisplays();
        }, 1000);
    }

    stopStopwatch() {
        if (!this.isStopwatchRunning) return;
        
        this.isStopwatchRunning = false;
        this.stopwatchIcon.classList.remove('running');
        this.stopwatchStartBtn.textContent = 'Start';
        this.stopwatchStartBtn.disabled = false;
        
        clearInterval(this.stopwatchInterval);
    }

    resetStopwatch() {
        this.stopStopwatch();
        this.stopwatchTime = 0;
        this.updateDisplays();
    }

    toggleStopwatch() {
        if (this.isStopwatchRunning) {
            this.stopStopwatch();
        } else {
            this.startStopwatch();
        }
    }

    // Countdown methods
    startCountdown() {
        if (this.isCountdownRunning) return;
        if (this.countdownTime <= 0) {
            alert('Please set a time for countdown!');
            return;
        }
        
        this.isCountdownRunning = true;
        this.countdownIcon.classList.add('running');
        this.countdownStartBtn.textContent = 'Running...';
        this.countdownStartBtn.disabled = true;
        
        this.countdownInterval = setInterval(() => {
            this.countdownTime--;
            this.updateDisplays();
            
            if (this.countdownTime <= 0) {
                this.finishCountdown();
            }
        }, 1000);
    }

    stopCountdown() {
        if (!this.isCountdownRunning) return;
        
        this.isCountdownRunning = false;
        this.countdownIcon.classList.remove('running', 'finished');
        this.countdownStartBtn.textContent = 'Start';
        this.countdownStartBtn.disabled = false;
        
        clearInterval(this.countdownInterval);
    }

    resetCountdown() {
        this.stopCountdown();
        this.updateCountdownFromInputs();
    }

    finishCountdown() {
        this.stopCountdown();
        this.countdownIcon.classList.add('finished');
        
        // Play alert sound (if available)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0vWwmC');
            audio.play().catch(() => {}); // Ignore if audio fails
        } catch (e) {}
        
        alert('Time\'s up!');
        
        setTimeout(() => {
            this.countdownIcon.classList.remove('finished');
        }, 3000);
    }

    toggleCountdown() {
        if (this.isCountdownRunning) {
            this.stopCountdown();
        } else {
            this.startCountdown();
        }
    }

    updateCountdownFromInputs() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        
        this.countdownTime = hours * 3600 + minutes * 60 + seconds;
        this.updateDisplays();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Timer();
});

// Add some interactive effects to navigation buttons
document.querySelectorAll('.nav-btn, .footer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add click effects to header buttons
document.querySelectorAll('.header-btn, .bottom-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
});
