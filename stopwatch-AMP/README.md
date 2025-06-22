# Stopwatch & Countdown Web App

## Descripción
Aplicación web que permite utilizar un cronómetro (stopwatch) y una cuenta atrás (countdown) con una interfaz moderna inspirada en [online-stopwatch.com](https://www.online-stopwatch.com/) y la referencia visual proporcionada.

## Modelo LLM Utilizado
- **ChatGPT GPT-4.0 (2024-06)**

## Tech Stack
- **Frontend:** HTML5, Tailwind CSS (CDN)
- **Lógica:** Vanilla JavaScript (ES6+)
- **Sin dependencias externas adicionales**

## Funcionalidades
- **Selector de modo:** Toggle para cambiar entre cronómetro y cuenta atrás.
- **Display grande:** Muestra el tiempo en formato 00:00:00.000.
- **Botones grandes:** Start (verde) y Clear (rojo).
- **Selectores rápidos:** En modo cuenta atrás, suma minutos/segundos o resetea el tiempo con botones rápidos.
- **Responsive:** Diseño adaptado a escritorio y tablets.
- **Inspiración visual:** Basado en la referencia de [online-stopwatch.com](https://www.online-stopwatch.com/) y la imagen `res/stopwatch.png`.

## Instrucciones para ejecutar en local

1. **Clona el repositorio o descarga los archivos.**
2. Ve a la carpeta `stopwatch-AMP`.
3. Abre el archivo `index.html` en tu navegador web favorito (no requiere servidor ni instalación de dependencias).

```
# Ejemplo en terminal
cd stopwatch-AMP
open index.html  # (en Mac) o doble clic en el archivo en cualquier SO
```

## Estructura de archivos
- `index.html`: Estructura y estilos (Tailwind vía CDN)
- `script.js`: Lógica de cronómetro y cuenta atrás
- `prompts.md`: Historial de prompts y modelo utilizado
- `README.md`: Este archivo

## Créditos y referencias
- Inspirado en: [online-stopwatch.com](https://www.online-stopwatch.com/)
- Imagen de referencia: `res/stopwatch.png`