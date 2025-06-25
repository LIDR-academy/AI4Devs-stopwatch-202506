// Stopwatch logic
let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateStopwatchDisplay() {
    document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
}

document.getElementById('stopwatch-start').addEventListener('click', function () {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        this.textContent = 'Pause';
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 1000;
            updateStopwatchDisplay();
        }, 1000);
    } else {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        this.textContent = 'Continue';
    }
});

document.getElementById('stopwatch-clear').addEventListener('click', function () {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    isStopwatchRunning = false;
    document.getElementById('stopwatch-start').textContent = 'Start';
    updateStopwatchDisplay();
});

// Countdown logic
let countdownInterval;
let countdownTime = 0;
let isCountdownRunning = false;

function updateCountdownDisplay() {
    document.getElementById('countdown-display').textContent = formatTime(countdownTime);
}

document.getElementById('countdown-start').addEventListener('click', function () {
    const input = document.getElementById('countdown-input');
    const alarm = document.getElementById('alarm-sound');

    if (!isCountdownRunning) {
        if (countdownTime === 0) {
            const seconds = parseInt(input.value, 10);
            if (isNaN(seconds) || seconds <= 0) {
                alert('Please enter a valid number of seconds.');
                return;
            }
            countdownTime = seconds * 1000;
        }

        isCountdownRunning = true;
        this.textContent = 'Pause';
        countdownInterval = setInterval(() => {
            countdownTime -= 1000;
            updateCountdownDisplay();

            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                alarm.play();
                isCountdownRunning = false;
                document.getElementById('countdown-start').textContent = 'Start';
                countdownTime = 0;
                updateCountdownDisplay();
            }
        }, 1000);
    } else {
        clearInterval(countdownInterval);
        isCountdownRunning = false;
        this.textContent = 'Resume';
    }
});

document.getElementById('countdown-clear').addEventListener('click', function () {
    clearInterval(countdownInterval);
    countdownTime = 0;
    isCountdownRunning = false;
    document.getElementById('countdown-start').textContent = 'Start';
    updateCountdownDisplay();
});
