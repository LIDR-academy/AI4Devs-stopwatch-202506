// --- Utility Functions ---

/**
 * Formats milliseconds into HH:MM:SS.MMM
 * @param {number} ms - Time in milliseconds.
 * @returns {string} Formatted time string.
 */
function formatStopwatchTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * Formats seconds into HH:MM:SS
 * @param {number} totalSeconds - Total time in seconds.
 * @returns {string} Formatted time string.
 */
function formatCountdownTime(totalSeconds) {
    if (totalSeconds < 0) totalSeconds = 0; // Ensure no negative time displayed
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Shows a custom alert message box.
 * @param {string} message - The message to display.
 */
function showAlert(message) {
    const alertBox = document.getElementById('alert-message-box');
    const alertText = document.getElementById('alert-message-text');
    const alertOkBtn = document.getElementById('alert-message-ok');

    alertText.textContent = message;
    alertBox.classList.remove('hidden');

    alertOkBtn.onclick = () => {
        alertBox.classList.add('hidden');
    };
}


// --- Stopwatch Logic ---

const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchStopBtn = document.getElementById('stopwatch-stop');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const stopwatchLapBtn = document.getElementById('stopwatch-lap');
const lapList = document.getElementById('lap-list');

let stopwatchInterval;
let stopwatchRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 0;

/**
 * Updates the stopwatch display.
 */
function updateStopwatchDisplay() {
    // Calculate current elapsed time based on when it started and current time
    elapsedTime = Date.now() - startTime;
    stopwatchDisplay.textContent = formatStopwatchTime(elapsedTime);
}

/**
 * Starts the stopwatch.
 */
function startStopwatch() {
    if (!stopwatchRunning) {
        // If starting for the first time or after a reset/stop
        startTime = Date.now() - elapsedTime; // Adjust startTime to account for previous elapsed time
        stopwatchInterval = setInterval(updateStopwatchDisplay, 1); // Update every 1ms for accuracy
        stopwatchRunning = true;

        stopwatchStartBtn.disabled = true;
        stopwatchStopBtn.disabled = false;
        stopwatchResetBtn.disabled = false;
        stopwatchLapBtn.disabled = false;
    }
}

/**
 * Stops the stopwatch.
 */
function stopStopwatch() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval); // Stop the interval
        stopwatchRunning = false;

        stopwatchStartBtn.disabled = false; // Allow restarting
        stopwatchStopBtn.disabled = true;
        stopwatchLapBtn.disabled = true; // Laps only when running
    }
}

/**
 * Resets the stopwatch.
 */
function resetStopwatch() {
    stopStopwatch(); // Stop if running
    elapsedTime = 0; // Reset elapsed time
    lapCounter = 0; // Reset lap counter
    stopwatchDisplay.textContent = formatStopwatchTime(elapsedTime); // Update display
    lapList.innerHTML = ''; // Clear lap list

    stopwatchStartBtn.disabled = false;
    stopwatchStopBtn.disabled = true;
    stopwatchResetBtn.disabled = true;
    stopwatchLapBtn.disabled = true;
}

/**
 * Records a lap time.
 */
function recordLap() {
    if (stopwatchRunning) {
        lapCounter++;
        const lapTime = formatStopwatchTime(elapsedTime);
        const li = document.createElement('li');
        li.className = 'lap-item';
        li.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${lapTime}</span>`;
        lapList.prepend(li); // Add new lap to the top of the list
    }
}

// Event Listeners for Stopwatch
stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchStopBtn.addEventListener('click', stopStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);
stopwatchLapBtn.addEventListener('click', recordLap);


// --- Countdown Logic ---

const countdownDisplay = document.getElementById('countdown-display');
const countdownInput = document.getElementById('countdown-input');
const countdownSetBtn = document.getElementById('countdown-set');
const countdownStartBtn = document.getElementById('countdown-start');
const countdownPauseBtn = document.getElementById('countdown-pause');
const countdownResetBtn = document.getElementById('countdown-reset');

let countdownInterval;
let totalCountdownSeconds = 0;
let remainingSeconds = 0;
let countdownRunning = false;

/**
 * Sets the countdown time from the input field.
 */
function setCountdownTime() {
    stopCountdown(); // Stop any active countdown first
    const inputVal = countdownInput.value;
    const parts = inputVal.split(':').map(Number);

    if (parts.length === 3 && !parts.some(isNaN)) {
        const hours = parts[0] || 0;
        const minutes = parts[1] || 0;
        const seconds = parts[2] || 0;

        totalCountdownSeconds = hours * 3600 + minutes * 60 + seconds;
        remainingSeconds = totalCountdownSeconds;

        if (remainingSeconds > 0) {
            countdownDisplay.textContent = formatCountdownTime(remainingSeconds);
            countdownStartBtn.disabled = false;
            countdownPauseBtn.disabled = true;
            countdownResetBtn.disabled = false;
            countdownInput.disabled = false; // Re-enable input after setting
        } else {
            showAlert("Please enter a valid time (HH:MM:SS) greater than zero.");
            countdownStartBtn.disabled = true;
            countdownPauseBtn.disabled = true;
            countdownResetBtn.disabled = true;
        }
    } else {
        showAlert("Invalid time format. Please use HH:MM:SS (e.g., 01:30:00).");
        countdownStartBtn.disabled = true;
        countdownPauseBtn.disabled = true;
        countdownResetBtn.disabled = true;
    }
}

/**
 * Updates the countdown display and handles timer completion.
 */
function updateCountdownDisplay() {
    if (remainingSeconds <= 0) {
        stopCountdown();
        countdownDisplay.textContent = "00:00:00";
        showAlert("Countdown finished!");
        countdownStartBtn.disabled = true;
        countdownPauseBtn.disabled = true;
        countdownResetBtn.disabled = false; // Allow reset after completion
        countdownInput.disabled = false; // Allow setting new time
        return;
    }

    remainingSeconds--;
    countdownDisplay.textContent = formatCountdownTime(remainingSeconds);
}

/**
 * Starts the countdown timer.
 */
function startCountdown() {
    if (!countdownRunning && remainingSeconds > 0) {
        countdownInterval = setInterval(updateCountdownDisplay, 1000); // Update every second
        countdownRunning = true;

        countdownStartBtn.disabled = true;
        countdownPauseBtn.disabled = false;
        countdownResetBtn.disabled = false;
        countdownInput.disabled = true; // Disable input while running
    }
}

/**
 * Pauses the countdown timer.
 */
function pauseCountdown() {
    if (countdownRunning) {
        clearInterval(countdownInterval);
        countdownRunning = false;

        countdownStartBtn.disabled = false; // Allow resuming
        countdownPauseBtn.disabled = true;
        countdownResetBtn.disabled = false;
        countdownInput.disabled = false; // Allow changing time even if paused
    }
}

/**
 * Stops and resets the countdown timer to its initial set time or 00:00:00 if not set.
 */
function resetCountdown() {
    stopCountdown();
    remainingSeconds = totalCountdownSeconds; // Reset to the last set time
    if (totalCountdownSeconds === 0) {
        countdownDisplay.textContent = "00:00:00"; // If no time was ever set
        countdownInput.value = ""; // Clear input field on full reset
    } else {
        countdownDisplay.textContent = formatCountdownTime(remainingSeconds);
    }

    countdownStartBtn.disabled = (totalCountdownSeconds === 0); // Disable start if no time set
    countdownPauseBtn.disabled = true;
    countdownResetBtn.disabled = (totalCountdownSeconds === 0);
    countdownInput.disabled = false; // Enable input
}

/**
 * Stops the countdown interval and sets running flag to false.
 */
function stopCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
}

// Event Listeners for Countdown
countdownSetBtn.addEventListener('click', setCountdownTime);
countdownStartBtn.addEventListener('click', startCountdown);
countdownPauseBtn.addEventListener('click', pauseCountdown);
countdownResetBtn.addEventListener('click', resetCountdown);

// --- View Toggle Logic ---
const toggleViewBtn = document.getElementById('toggle-view-btn');
const stopwatchSection = document.getElementById('stopwatch-section');
const countdownSection = document.getElementById('countdown-section');

/**
 * Toggles the visibility between the stopwatch and countdown sections.
 */
function toggleView() {
    if (stopwatchSection.classList.contains('hidden')) {
        // Currently showing countdown, switch to stopwatch
        stopwatchSection.classList.remove('hidden');
        countdownSection.classList.add('hidden');
        toggleViewBtn.textContent = 'Show Countdown';
    } else {
        // Currently showing stopwatch, switch to countdown
        stopwatchSection.classList.add('hidden');
        countdownSection.classList.remove('hidden');
        toggleViewBtn.textContent = 'Show Stopwatch';
    }
}

// Event Listener for Toggle Button
toggleViewBtn.addEventListener('click', toggleView);


// Initial state setup for buttons and view
window.onload = () => {
    resetStopwatch(); // Initialize stopwatch buttons
    resetCountdown(); // Initialize countdown buttons
    // Initially show stopwatch, hide countdown
    stopwatchSection.classList.remove('hidden');
    countdownSection.classList.add('hidden');
    toggleViewBtn.textContent = 'Show Countdown';
};

