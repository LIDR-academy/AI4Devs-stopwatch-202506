# Prompts usados en la construcción de la aplicación

## LLM
- **Modelo usado:** GPT-4o (modo código)

---

## Prompts utilizados

### 1. Prompt inicial
```markdown
You are an expert Front‑End Engineer with deep expertise in modern JavaScript architectures, SOLID design principles and Test‑Driven Development (TDD). You have at least 5 years of experience building pixel‑perfect, responsive web apps and writing clean, maintainable code.

Build the application specified in the document "PromptDoc.docx".

As you progress, keep asking for confirmation and start asking the questions related to the next deliverable to be generated, so that you can create it right after.
```

### 2. Confirmación para iniciar con `style.css`
```markdown
Si, continua con el archivo style.css.
1. Las imágenes de referencia se encuentran en el documento de especificación entregado antes.
2. light
```

### 3. Confirmación para iniciar con `script.js`
```markdown
Si, continúa con el archivo script.js.
1. No. Un único archivo script.js
2. Ambos a la vez
3. Primero la funcionalidad. Vamos a postponer la arquitectura TDD
```

### 4. Solicitud de ajustes visuales
```markdown
Vamos a aplicar varios ajustes. Primero ajusta la interface principal para que luzca como te lo indique en el documento de especificación y como se ve en la imagen
```

### 5. Solicitud de que aparezca primero la pantalla de selección
```markdown
La interface que debe aparecer de primera es la de cambio de modo que permite seleccionar entre Stopwatch y Countdown. Genera los cambios para que al cargar el index.html se presente esta interface de primera
```

### 6. Confirmación para continuar con ajustes visuales
```markdown
Si
```

### 7. Confirmación para integrar íconos
```markdown
Busca e incluye los iconos png
```

### 8. Selección de íconos deseados
```markdown
para green-up-arrow.png la opcion 2 y
para red-down-arrow.png la opcion 4
```

### 9. Solicitud de SVG embebido
```markdown
Prepara versiones alternativas embebidas en SVG directamente en el HTML
```

### 10. Confirmación de colores fijos
```markdown
Colores fijos. Ajusta la logica porque al dar click en cualquiera de las opciones no esta haciendo nada
```

### 11. Confirmación de duda
```markdown
Aclarame si el codigo generado va dentro del html o dentro del js
```

### 12. Generar README
```markdown
No, genera el Readme.md
```

### 13. Generar Prompt.md
```markdown
Genera un Prompt.md con los prompts usados en este chat y especificando cual LLM y modo fue usado
```

---

Este documento resume todos los comandos y decisiones de diseño utilizadas en la conversación, incluyendo el modelo que generó las respuestas.
