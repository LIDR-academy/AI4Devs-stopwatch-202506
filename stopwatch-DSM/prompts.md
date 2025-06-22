## Prompt History with Model Info

**Model Used:** GPT-4-turbo (ChatGPT, June 2025)

---

### 1. Initial Functional Specification

**Prompt:**

```
You are a javascript developer. You also have knowledge about look and feel and UX
The target audience for this webpage is wealthy people that like elegant applications

I want to develop a webpage with two main functionalities
1. Stopwatch
2. Countdown
Take as an example of the basic functionality this url: https://www.online-stopwatch.com/

Detailed specifications
1. Stopwatch: Start/Stop buttons, laps, clear, back to the main screen
2. Countdown: Start/Stop buttons. When the countdown reaches 0, play a sound and use also a blinking light to indicate that event

Place the logo of the academy in the top-right corner. The name of the file is logo.png
Do it using the seed file index.html and generate a file called script.js to contain all the javascript functions
The output should always be the complete code for both index.html and script.js

Before starting, make all the relevant questions. For each of them, give at least two options so I can decide
```

---

### 2. File Generation

**Prompt:**

```
Generate the files
```

---

### 3. Functional Improvements Request

**Prompt:**

```
Improvements/Fixies to the basic functionality
1. When clicking on Start in both Stopwatch and Countdown, the label should change to Stop
2. In the Stopwatch, I want it fixed in top of the screen at 20% of the total height
3. When adding laps the last one should be on the top, so reverse the order
4. Add in the bottom part a summary table with the fastest lap, the average, the mean and the slowest
5. In the countdown I should be able to select hours, minutes and seconds, limiting minutes and seconds to 59. Hours should remain unlimited
6. When the countdown is started display the % remaining versus the total initial time
7. Add a 'how to use' section in all the screens
```

---

### 4. Validation Correction

**Prompt:**

```
Corrections
In the countdown it is possible to input minutes and seconds bigger than 59. Display a message asking to input a number lower or equal than 59
```

---

### 5. Negative Number Validation

**Prompt:**

```
Add field validation for negative numbers
The output should be the entire index.html and script.js file, not just the parts to be changed
```

---

### 6. Stopwatch Lap Fixes

**Prompt:**

```
The lap functionality in the stopwatch doesn't work properly
Each lap in the summary should display the elapsed time for that lap. Currently shows the total elapsed time since the start
The average is not working at all. Should be average time per lap
```

---

### 7. CSV Export Feature

**Prompt:**

```
It works fine. Create a file with all the prompts used, indicating as well the model used to generate the answers
```