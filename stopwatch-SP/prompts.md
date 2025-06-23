# Rol
Eres un experto en desarrollo frontend en javascript y usabilidad web.

# Objetivo
Dada la referencia visual y los requisitos, crea un cronómetro y cuenta atrás (timer) con una interfaz atractiva y funcional, similar a la de https://www.online-stopwatch.com/ y siguiendo el diseño mostrado en la imagen res/stopwatch.png.

# Formato
Solo quiero el código necesario para los archivos index.html, script.js y styles.css, siguiendo la estructura y diseño de la referencia. No incluyas explicaciones, solo el código.

# Historia de Usuario: Cronómetro y Cuenta Atrás Visual

## Resumen
Como usuario, quiero poder medir el tiempo con precisión usando un cronómetro y también poder configurar una cuenta atrás, todo en una interfaz clara, grande y fácil de usar, similar a la referencia visual proporcionada (ver imagen res/stopwatch.png).

## Descripción de la Funcionalidad
- El usuario puede alternar entre modo "Cronómetro" y "Cuenta atrás" mediante botones.
- Al cambiar a modo "Cuenta atrás", debe aparecer un solo prompt para ingresar el tiempo (en formato mm:ss o solo segundos). Si el usuario cancela o introduce un valor inválido, no debe cambiar de modo ni deshabilitar el botón.
- El display muestra horas:minutos:segundos:milisegundos en grande, con fondo claro y borde redondeado.
- Botón verde grande "Start" (que cambia a "Pause" cuando está corriendo).
- Botón rojo grande "Clear" para reiniciar el tiempo.
- En modo cuenta atrás, al cambiar de modo, se solicita al usuario el tiempo inicial (minutos y segundos).
- El cronómetro cuenta desde 00:00:00.000 hacia arriba.
- La cuenta atrás muestra el tiempo restante y se detiene en 00:00:00.000.
- El diseño debe ser responsivo y visualmente similar a la imagen de referencia (ver res/stopwatch.png).

----
# Mejoras y Ajustes (Nuevos requisitos y mejoras en la experiencia por instruccion)** 

- Corrige el comportamiento del botón "Clear" para que, al presionarlo, simplemente reinicie el contador a cero en ambos modos (cronómetro y cuenta atrás), sin mostrar ventana emergente ni solicitar tiempo. Solo al cambiar de modo a "Cuenta atrás" se solicita el tiempo inicial.
- Corrige el disparo doble de la ventana emergente al cambiar a modo "Cuenta atrás". Ahora solo aparece una vez al cambiar de modo, y el botón activo queda deshabilitado para evitar dobles clics accidentales.
- Mejora el diseño de la experiencia al cambiar a modo "Cuenta atrás": ahora solo se muestra un mensaje emergente para ingresar el tiempo (en formato mm:ss o solo segundos). Si el usuario cancela o introduce un valor inválido, no se cambia de modo ni se deshabilita el botón.

---

**Chatbot utilizado:** ChatGPT (GPT-4)

