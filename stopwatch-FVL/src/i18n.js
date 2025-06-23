import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      title: 'Cronómetro y Temporizador',
      start: 'Iniciar',
      pause: 'Pausa',
      reset: 'Reiniciar',
      clear: 'Limpiar',
      timeUp: '¡Tiempo acabado!'
    },
  },
  // Ejemplo de futuro idioma
  en: {
    translation: {
      title: 'Stopwatch & Countdown',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      clear: 'Clear',
      timeUp: "Time's Up!"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;