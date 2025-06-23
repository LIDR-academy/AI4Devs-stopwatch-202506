# LLM usado: Google Gemini 2.5 Flash
# Promt usado:

Crea una página web interactiva que implemente las funcionalidades de un cronómetro y una cuenta atrás. El diseño deberá basarse en una imagen de referencia que te proporcionaré.

- Criterios Técnicos:
    1. Separación de Código: Divide el código HTML y JavaScript en dos archivos distintos: index.html y script.js.
    2. JavaScript Vanilla: Utiliza únicamente JavaScript Vanilla para toda la lógica.
    3. Principios SOLID: Aplica los principios SOLID en la medida de lo posible para asegurar un código limpio y mantenible.
    4. Registro de Consola: Implementa los logs necesarios en la consola para rastrear eventos importantes y el flujo de la aplicación.
    5. Manejo de Excepciones: Atrapa todas las posibles excepciones para garantizar la robustez del código.
    6. CSS: Para el diseño usa Bootstrap.
    7. Diseño Responsivo: Asegura que la página sea completamente responsiva y se adapte a diferentes tamaños de pantalla.

- Criterios Funcionales:
    1. Cronómetro:
        1.1 Debe mostrar el tiempo transcurrido en formato HH:MM:SS (Horas:Minutos:Segundos).
        1.2 Debe tener botones para Iniciar, Detener y Reiniciar el cronómetro.
        1.3 La función de "Detener" debe pausar el cronómetro, y al "Iniciar" nuevamente, debe reanudar desde donde se detuvo.
        1.4 La función de "Reiniciar" debe poner el cronómetro a cero y detenerlo.

    2. Cuenta Atrás:
        2.1 Debe permitir al usuario establecer un tiempo inicial para la cuenta atrás (por ejemplo, mediante inputs para horas, minutos y segundos).
        2.2 Debe mostrar el tiempo restante en formato HH:MM:SS.
        2.3 Debe tener botones para Iniciar, Pausar y Reiniciar la cuenta atrás.
        2.4 Al finalizar la cuenta atrás, se debe mostrar una notificación visual o sonora (por ejemplo, una alerta en pantalla o un sonido corto).
        2.5 La función de "Reiniciar" debe devolver la cuenta atrás a su tiempo inicial establecido y detenerla.

- Criterios Generales:
    1. Título y Descripción: Incluye un título atractivo y una descripción clara y concisa de la aplicación.
    2. Diseño Visual: El diseño general de la interfaz de usuario deberá ser muy similar al de la imagen de referencia que te proporcionaré. Presta especial atención a la disposición de los elementos, la tipografía, los colores y los estilos de los botones.    