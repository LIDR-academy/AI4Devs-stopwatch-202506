# Prompts Utilizados para el Ejercicio

### Chatbot Utilizado
Claude Sonnet 4 (Cursor)

# Prompt Inicial

## StopWatch Project

Crea una página web que permita a los usuarios utilizar un cronómetro y un timer (cuenta regresiva) dependiendo d ela necesidad

##  Criterios Funcionales

### Cronómetro

* El cronómetro hace conteo regresivo en segundos, minutos y horas.
* El cronómetro debe permitir que los usuarios empiecen, pausen y reinicien la medición del tiempo.
* El cronómetro debe permitir registrar vueltas, mostrando un listado de intérvalos de tiempo por vuelta
* El cronómetro deberá mostrar el tiempo en minutos, segundos y milisegundos
* Usa como referencia visual la imagen @Cronómetro.png  para la UI del cronómetro. 

### Timer

* El timer debe permitir que los usuarios empiece, pausen y reinicie
* El timer debe ofrecer preconfiguraciones rápidas (por ejemplo, 1, 2, 3, 4 minutos) para facilitar su uso.
* El timer también debe permitir que los usuarios configuren la duración deseada usando un selector de horas, minutos y segundos.
* El timer debe permitir iniciar, pausar y cancelar la cuenta regresiva en cualquier momento.
* Usa como referencia visual la imagen @Timer.png  y @Timers.png  para la UI del timer.

##  Criterios Técnicos

* Define un formulario simple pero agradable y minimalista
* La página web debe ser responsive
* La UI debe permitir cambiar entre el cronómetros y el timer en la misma página
* Manten todo el desarrollo dentro de los límites de los archivos actuales: @script.js y @index.html 
  -  @index.html  para la UI
  - @script.js   para el funcionamiento del cronómetro y el timer

## Criterios Generales

* Tanto para el timer como para el cronómetro, el conteo es en tiempo real

## Restriciones

* No agregues elementos de interfaz de usuario que no sean necesarios para la funcionalidad del cronómetro y el timer
* No agregues frameworks de estilo robustos, la página debe ser básica en dependencias externas. 
  - De preferencia utiliza bootstrap como framework CSS

Pregúntame cualquier información adicional que necesites para construir la página web

# Prompt Para Corrección

Puede que dejar solo íconos no sea del todo claro para algunos usuarios. Podrías debajo de cada ícono del tab de cronómetro, poner el nombre de cada acción? 

- Iniciar / Pausar
- Vuelta
- Reiniciar