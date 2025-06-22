# Nombre: Daniel Salgado
# Chatbot: Geminis 2.5 Pro

## Prompts: Se usaron 2 promtps, el primero para generar todas las reglas, y el segundo para generar unos ajustes visuales.
## Prompt 1:

Asume el rol de un experto desarrollador en Javascript.


Criterios Técnicos:
1. Separa los html de los js en archivos index.html y script.js respectivamente. Estos deben ser los únicos dos archivos del proyecto
2.  Usa Bootstrap
3.  Usa los principios SOLID
4.  Haz que el sitio sea responsivo.
5.  Comenta todas las funcionalidades detalladamente.
6.  Asegúrate de que todos los botones funcionen correctamente.

La solicitud es:
1. Crear un sitio que tenga un botón para un cronometro y otro para una cuenta atrás, ambos con un gran icono de una flecha. Una flecha verde apuntando hacia arriba en el caso del cronometro y una flecha roja apuntando hacia abajo en el caso de la cuenta atrás.
2. Al presionar cualquiera de los dos botones, debería limpiar la pantalla y mostrar los datos característicos de cada funcionalidad.
3. La pantalla de cronometro debería tener un contador de tiempo, con horas minutos y segundos, un botón de iniciar/pausar/continuar (dependiendo de la situación) y otro para limpiar el contador.
4. La pantalla de la cuenta atrás debería ser un input que solo permita formato de horas:minutos:segundos, además de un botón para iniciar/pausar y otro para detener, además de un botón para limpiar el contador e iniciar desde 0.
5. Ambas pantallas deberían de los puntos 3 y 4 deberían tener un botón para volver a la pantalla principal.

Otras consideraciones:
1. El tiempo debe permanecer visible en pantalla al finalizar ambas opciones.
2. En el caso de errores, despliega un mensaje indicando donde está el error. Como dato adicional, si el usuario ingresa por ejemplo 00:99:99, deberías corregir el valor moviendo los 60 segundos adicionales al contador de minutos, y los 60 minutos adicionales al contador de horas, por lo que debería quedar 01:40:39
3. Al finalizar la cuenta atrás, muestra una divertida animación de confite saltando por la pantalla.
4. En la pantalla de cuenta atrás, solo se pueden ingresar números en el input, los dos puntos (:) ya deberían ir fijos en el input.
5. Considera que se está usando lenguaje español, por lo que haz los ajustes adicionales para que los caracteres especiales (tilder, ñ, etc) se muestren correctamente, si es necesario usa los caracteres HTML
6. El tamaño de los contadores debería ser de al menos un 50% del tamaño actual de la ventana del navegador.
7. Añade a los temporizadores un contador de milésimas de segundos. Estos no deberían ser modificables, es solo informativo, debería tener siempre un tamaño más pequeño que el resto de números.
8. El diseño de colores debería ser similar al del sitio https://www.lidr.co/ considera que los colores son oscuros, por lo que los textos deebrían ser en un color que se vea a simple vista
9. El inpiut de cuenta atras debería ser un solo input, no de tamaño grande como los contadores, donde no sea necesario borrar los 00 iniciales y que el usuario pueda escribir directamente sobre ellos.


Pregúntame toda la información adicional que necesites, no asumas nada.

## Prompt 2:

1. Centra ambos botones de la pantalla inicial, uno al lado del otro, con una separación de 50px
2. Agrega el siguiente título a la pantalla de inicio: Stopwatch.
3. Agrega un fondo semitransparente de un reloj en la esquina superior derecha. Los colores actuales del sitio no deberían verse modificados
4. Agrega los títulos correspondientes a las pantallas de cronometro y cuenta atrás