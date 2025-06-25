# prompts.md

## 🤖 Asistente Utilizado

ChatGPT, específicamente el modelo **GPT-4o**.

---

## 💬 Prompt Inicial

```text
Create a web page with the design and UI/UI of the attached image. The general functionality is:
It must meet the following requirements: it is a page that functions as a stopwatch and a countdown. The user can use either of the two functions.

In addition to the acceptance criteria and architecture:

Technical criteria:
1. Create 3 files direct on chat console. Separate the HTML, CSS, and JavaScript code into index.html and script.js, styles.css.
2. Use Vanilla JavaScript.
2. Use CSS Vanilla, is very importante dont use @ in the css, because is a simple html not a node or express proyect
3. Apply the SOLID principles.
4. Implement all necessary logs in the console, use info log level, and use the most standard format.
5. Catch all possible exceptions.
6. For CSS, use Tailwind CSS and use a CDN link, the html must be clear tehe styles should be defined in the styles.css
7. Make it responsive.
8. For icons and fonts, use Material Design.
9. The Look and Feel must be very closr to the image upload
10. Time Format of the Real-time with "HH:MM:SS" format.
11. Alert Preferences: "https://pixabay.com/es/sound-effects/search/fire%20alarm/".

Functional criteria:
1. There must be three text boxes for the user to enter the desired time: one for hours, one for minutes, and one for seconds. These quantities must be positive values.

2. The blue "Stopwatch" button will indicate a countdown or timer starting at zero. It will clear any values ​​in the text boxes on the right where the timer is displayed for hours, minutes, seconds, and milliseconds and will reset those text boxes to 00. Clicking this button will also stop any active stopwatch or countdown that may be running.

3. The gray "Countdown" button will indicate a countdown, starting at the user's desired time. It will set the time that the user entered in the text boxes on the right, they will be established and initialized with said values ​​from left to right, these fields are hour, minutes, seconds, milliseconds will be set with a value of 999. Clicking on this button will also interrupt any active stopwatch or countdown that may be running.

4. When you click the play button:

4.1. If the button clicked was "Stopwatch," the time will begin to count up, incrementing the time, starting with milliseconds, then seconds. Upon reaching 60 seconds, it will increase by one minute, and upon reaching 60 minutes, it will increase by one hour.

4.2. If the button clicked was "Countdown," the time will begin to count down, decrementing the time,
starting with milliseconds, then seconds. Upon reaching 60 seconds, it will decrease or subtract one minute, and upon reaching 60 minutes,
it will decrease by one hour. When all the hour, minute, and second values ​​reach zero, a soft alarm should sound and stop the clock. The text boxes should also animate so they shake and turn red to indicate that the countdown limit has been reached.

5. Clicking Reset will reset the values ​​to their initial state, depending on whether it's a stopwatch or a countdown:

6. The countdown functionality should work as follows:

4.1 Do not enter negative amounts.  
4.2 Decrement the milliseconds. When it reaches zero milliseconds, it resets to 999 milliseconds and decrements one second.  
4.3 Decrement the seconds. When it reaches zero seconds, it resets to 59 seconds and decrements one minute.  
4.4 Decrement the minutes. When it reaches zero minutes, it resets to 59 minutes and decrements one hour.  
4.5 When it reaches zero in all text boxes (hours, minutes, seconds, and milliseconds), the countdown stops, and alerts are triggered. Text boxes are colored red using your CSS in addition to Shake.

7. Alarm Sound Source: please include a coveniente audio from public domain. be sure the resource of audio exists y and be avialable  
8. Play Button Design: Should it toggle to pause like a media player  
9. Initial State Behavior: stopwatch by default on load.  
10. Shake Animation: apply to all four boxes.  
11. Millisecond Handling: formatted as 3-digit.  
12. Millisecond Handling: For the stopwatch increment 100ms.  
13. The section for indicating the desired time will only be visible and available if you click the "Countdown" button. By default, when you open the page, the section should be hidden.  
14. If you click on the countdown button, the div to indicate the time will be displayed.  
    If you press play and select the countdown type with the button, you must enter the desired time. Otherwise, an alert message will be displayed to the user so they can enter it.
```

---

## ❓ Preguntas del Asistente Antes de Construir

```markdown
⚠️ Confirmación rápida antes de codificar

✅ Diseño visual (según imagen):
1. ¿Quieres que el diseño se vea idéntico al pixel al de la imagen o solo muy similar (90%), pero responsivo?
2. ¿El botón de "PAUSA" en la imagen debería estar siempre visible, o solo cambiar el ícono Play/Pause como en un reproductor?

🧠 Comportamientos específicos:
3. En el cronómetro (modo stopwatch): ¿Quieres que los milisegundos incrementen cada 100ms y muestren 000, 100, 200... hasta 900?
4. ¿Qué quieres que pase si el usuario cambia el modo (de countdown a stopwatch o viceversa) mientras está corriendo el reloj?
   - ¿Debe detenerse automáticamente y resetear?
   - ¿O continuar con el nuevo modo?

🔊 Alarma y animaciones:
5. ¿Quieres una alarma ligera (campana o tono simple) o una más escandalosa como sirena de fábrica?
6. ¿El efecto shake al finalizar countdown debe durar unos segundos y luego quitarse automáticamente?

🧩 Extra técnico:
7. ¿Quieres que la funcionalidad esté dividida en clases JavaScript (aplicando SOLID), o con funciones modulares?
8. ¿Debo dejar espacio en el código para un posible guardado local o historial en el futuro (ej: localStorage)?
```

---

## ✅ Mis Respuestas

```markdown
1. Diseño visual: muy similar, pero responsivo y con buen UX/UI.
2. El botón de pausa debe funcionar como un Play/Pause de reproductor.
3. En el cronómetro, los milisegundos deben incrementarse de 100 en 100 hasta llegar a 900.
4. Si el usuario cambia de modo, debe detener y reiniciar los contadores, como si se recargara la página.
5. La alarma debe ser ligera, tipo campanita.
6. El efecto de shake debe durar 5 segundos y luego quitarse automáticamente.
```

---

## 🔧 Modificaciones Posteriores Solicitadas

```markdown
1. En el modo cuenta regresiva, los milisegundos al reiniciar comenzaban en 999, pero deben iniciar en 000. Esto fue corregido.
2. La cuenta regresiva era demasiado lenta (1 segundo parecía durar 2). Se solucionó usando performance.now() para calcular el tiempo transcurrido con precisión real.
```