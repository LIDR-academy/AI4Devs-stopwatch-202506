llm utilizado: chatgpt gpt 40

#ROL
Eres un ingeniero de software experto en JavaScript y HTML. 
Tienes 7 años de experiencia en desarrollo web y has trabajado en múltiples proyectos de desarrollo de aplicaciones web, basados en arquitecturas limpias y escalables
#OBJETIVO
Desarrollar una aplicacion web que incluya un cronometro y un temporizador 

#formato
la aplicacion la tienes que desarrollar bajo el framework de React, tienes que preparar la arquitectura para poder ir incluyendo nuevas funcionalidades, y tiene que ser escalable.
tienes que incluir test unitarios y de integracion, y tienes que incluir un README.md con la documentacion del proyecto, incluyendo como instalarlo, como ejecutarlo, como hacer test y como contribuir al proyecto.
te puedes basar en la web https://www.online-stopwatch.com/ para recoger el aspecto visual de la interfaz
para la maquetacion de la interfaz de usuario te tienes que basar en la imagen stopwatch.png
utiliza como apoyo los ficheros index.html + script.js que proporcionamos

#descripcion de la funcionalidad cronometro
Que hace?: 
Mide tiempo hacia arriba desde 00 h 00 m 00 s con centésimas. Ideal para carreras, experimentos o presentaciones.
como se usa?
1. Pulsa Start (o la barra espaciadora si usas atajos).
2. Stop/ Pause detiene el conteo; puedes reanudarlo.
3. Reset vuelve a cero.
4. En la versión Split Lap Timer hay botón Lap para registrar parciales.

Extras útiles
* Pantalla completa: “Use the Online Stopwatch Full Screen” muestra dígitos gigantes (modo Super Fullscreen) 
online-stopwatch.com
* “Large Stopwatch”: la misma vista grande, accesible con un clic del menú principal 
online-stopwatch.com
* Historial de vueltas: lista los tiempos lap para copiarlos después.


#descripcion de la funcionalidad cronometro
que hace?
Qué hace	Cómo se usa	Extras útiles
Cuenta hacia abajo desde el tiempo que indiques (de 1 s a más de un año) 
Cuando llega a cero, emite una alarma sonora y parpadea “Time’s Up”.
Cómo se usa?
1. Introduce horas : minutos : segundos
2. Pulsa Start.
3. Pause o Stop detienen la cuenta; Reset la reinicia.
4. Alarma: se repite hasta que la detengas, así no pasarás el aviso por alto

Extras útiles
* Pantalla completa: botón “Use the Countdown Timer Full Screen” 
* Loop Timer: repite el mismo intervalo automáticamente (ideal para circuitos de entrenamiento).
* Interval Timer: programa varias fases (p. ej. 30 s de ejercicio / 10 s de descanso).
* Make Your Own Timer / Custom Countdown: diseña un temporizador con tu propia fecha, sonidos y fondo.
* Plantillas rápidas: ofrece temporizadores pre-hechos (5 min, 30 seg, 7 días…) listos para usar.
* Uso con teclado:  permitir introducir tiempo y arrancar/parar solo con teclas

Hazme las preguntas que creas conveniente en caso de duda







### dudas de la ia ####
Dudas para aclarar antes de generar el repo y los archivos
| # | Pregunta | Opciones /
detalles |
|---|----------|----------------|
| 1 | El requisito menciona “MediaEncryptedEvent”. ¿Es un typo (¿quizá “MERN” o “MEVN”)? | Confírmame la intención. |
| 2 | TypeScript vs JavaScript puro. | En la propuesta uso TS; si prefieres JS avísame. |
| 3 | Tailwind ¿te encaja? Si ya utilizáis otra metodología (BEM, Styled-Components) lo adapto. | |
| 4 | Assets: ¿Nos facilitas stopwatch.png, index.html, script.js, sonido .mp3? | Path / carpeta de design-assets. |
| 5 | Alarma sonora: ¿usamos un beep propio (libre) o tendrás un archivo corporativo? | |
| 6 | Atajos de teclado (espacio, enter, etc.) ↔ Accesibilidad (ARIA live, focus). ¿Algún requisito específico WCAG AA? | |
| 7 | Idiomas: la UI es ES solo, o planteamos i18n ready (react-i18next)? | |
| 8 | ¿Debemos contemplar desde ya funcionalidades “Loop Timer” o “Interval Timer”, o se dejan como epic posterior? | |

Respuesta
1. ignoralo
2. java script
3, usa tailwind
4 assets adjunto : stopwatch.png, index.html, script.js crealo tu si es necesario y sonido de momento no
5, usa uno libre
6. no, pero indicalos en el readme
7 español, pero dejalo preparado como multilenguaje
8 dejamos como epic otras funcionalidades como “Loop Timer” o “Interval Timer”
se tiene que poder desplegar en local, deja las intrucciones