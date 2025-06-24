# Cronómetro y Temporizador Interactivo

Aplicación web interactiva, moderna y responsive, que permite medir tiempo tanto en modo **cronómetro** (cuenta ascendente) como en **temporizador** (cuenta regresiva), inspirada en el diseño visual de la imagen de referencia.

## Características principales

- **Selector visual** tipo pestañas con iconos SVG animados para alternar entre modos.
- **Pantalla de tiempo** grande, azul, redondeada y con formato `HH:MM:SS.mmm` (milisegundos siempre visibles, como en la foto de referencia).
- **Botones grandes y visuales**: iniciar, pausar, reanudar, detener y poner a cero, con lógica condicional.
- **Configuración personalizada** del temporizador (minutos y segundos).
- **Responsive** y mobile first.
- **Estilos modernos** gracias a TailwindCSS y DaisyUI (no se usa ningún style.css ni @apply).
- **Texto 100% en español**.
- **Logs de eventos** y robustez por diseño.
- **Fácil de editar y adaptar**.

## ¿Cómo se usa?

1. **Abre `index.html`** en cualquier navegador moderno.
2. Elige el modo con las pestañas ("Cronómetro" o "Temporizador").
3. Para temporizador, configura el tiempo y pulsa "Establecer".
4. Usa los botones inferiores para iniciar, pausar, reanudar, detener o poner a cero el tiempo.
5. El display y los botones cambian de acuerdo al estado (igual que en la referencia).

## Estructura de archivos

- `index.html` – Estructura principal, incluye todo el diseño y scripts.
- `script.js` – Toda la lógica de la app y la interacción.
- `README.md` – Este archivo.
- `promt.md` – Historial del prompt, con todas las preguntas y respuestas del proceso de desarrollo.

---

## Prompt utilizado

El historial completo de especificaciones, preguntas, respuestas y mejoras está en el archivo `promt.md`.

## Cuaderno de Bitacora
En el fichero `CuadernoBitacora.md` se documentan todas las iteraciones con chatGPT, incluyendo las preguntas realizadas, respuestas del usuario, nuevas peticiones y mejoras, observaciones y problemas encontrados, y ajustes realizados.
