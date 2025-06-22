#ChatGPT 4o

#ROL
Compórtate como un desarrollador senior JavaScript

#Objetivo
Necesito que partiendo del fichero index.html adjunto, desarrolles una página web apoyándote en JavaScript, en la cual el usuario pueda elegir entre dos comportamientos: Cronómetro o Cuenta atrás.

#Diseño de la página de inicio
La página debe de contener dos botones que nos hacen navegar a diferentes funcionalidades:
-Cronómetro
-Cuenta atrás 

#Diseño de la pantalla Cronómetro
La pantalla mostrará un contador en formato digital "horas:minutos:segundos:milésimas de segundo" por ejemplo "02:32:15.658".
Debajo del contador tiene que haber dos botones: "Start/Stop" y "Reset".
Y debajo de los botones otro botón "Back" para volver a la página de inicio.

#Estado inicial del Cronómetro.
Al cargar la página por primera vez:
- El botón "Start/Stop", debe mostrar el valor "Start" con el botón en color verde.
- El botón "Reset", debe aparecer deshabilitado.
- El contador tiene que aparecer inicializado a "00:00:00.000"

Comportamiento de los botones del Cronómetro:
- El botón "Start/Stop", Al pulsar sobre el botón cuando indica "Start", debe de cambiar su contenido a "Stop" y cambiar de color a rojo. También debe iniciar el contador desde el valor que tenga en ese momento, y mantenerse actualizado en pantalla todo el momento y debe deshabilitar el botón "Reset".

- El botón "Start/Stop", Al pulsar sobre el botón cuando indica "Stop", debe de cambiar su contenido a "Start" y cambiar de color a verde. También debe parar el contador y habilitar el botón "Reset".

- El botón "Reset", es el encargado de volver a establecer el contador a su valor inicial "00:00:00.000", después de pulsarse en el, tiene que desactivarse.

- El botón "Back", deja la página del Cronómetro en su estado incial, y vuelve a la páginad e inicio.



#Diseño de la pantalla Cuenta atrás
La pantalla mostrará un contador en formato digital "horas:minutos:segundos" por ejemplo "00:00:00".
Debajo del contador tiene que haber diez botones con números del 0 al 9 que se usará como selector de tiempo, con la siguiente distribución, -fila 1: 1,2,3 -fila 2: 4,5,6 -fila 3: 7,8,9 y -fila4: sólo el 0 debajo del 8.
Debajo de los números tiene que haber dos botones: "Start/Stop" y "Reset".
Y debajo de los botones otro botón "Back" para volver a la página de inicio.
Debajo del botón "Back" necesito poner una advertencia en letra más pequeña que indique: "La cuenta atrás sólo se podrá inciar si se selecciona algún tiempo superior a 00:00:00".

#Estado inicial del Cuenta atrás.
Al cargar la página por primera vez:
- El botón "Start/Stop", debe mostrar el valor "Start" con el botón en color verde sólo cuando el contador es distinto de "00:00:00.000".
- El botón "Reset", debe aparecer deshabilitado.
- El contador tiene que aparecer inicializado a "00:00:00"

Comportamiento de los botones del Cronómetro:
- Los botones del selector de tiempo sólo estarán activos cuando el contador tenga el valor "00:00:00", al pulsarlos se irán introduciendo valores en el contador, por ejemplo: si se pulsa el botón "3", "2", "1", "9" significará "00:32:19" o si se introduce "9", "9", "5", "4", "1", "3" significará "99:54:13" siempre hasta completar los 6 dígitos, una vez se hayan introducido 6 dígitos, los botones del selector de números se desactivarán.

- El botón "Start/Stop", Al pulsar sobre el botón cuando indica "Start", debe de cambiar su contenido a "Stop" y cambiar de color a rojo. También debe iniciar el contador descenciente desde el valor que tenga en ese momento, y mantenerse actualizado en pantalla todo el momento y debe deshabilitar el botón "Reset" y los botones del selector.

- El botón "Start/Stop", Al pulsar sobre el botón cuando indica "Stop", debe de cambiar su contenido a "Start" y cambiar de color a verde. También debe parar el contador y habilitar el botón "Reset".

- El botón "Reset", es el encargado de volver a establecer el contador a su valor inicial "00:00:00", este botón sólo puede estar activador cuando el contador no esté corriendo y el valor del contador sea distinto de "00:00:00".

- El botón "Back", deja la página del Cronómetro en su estado incial, y vuelve a la páginad e inicio.


#Resultado
Necesito que me devuelvas únicamente dos archivos:
index.html
script.js