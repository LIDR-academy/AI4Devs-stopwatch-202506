import React, { useState, useEffect, useRef } from 'react';
import useCountdown from '../../shared/hooks/useCountdown';
import Button from '../../shared/components/Button';
import { useTranslation } from 'react-i18next';

function format(cs) {
  const centiseconds = cs % 100;
  const totalSeconds = Math.ceil(cs / 100); // redondeamos hacia arriba para mostrar 1 segundo completo restante
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    centiseconds: String(centiseconds).padStart(2, '0'),
  };
}

export default function Countdown() {
  const { t } = useTranslation();
  const [input, setInput] = useState('00:01:00'); // HH:MM:SS
  const beepRef = useRef(null);
  const { remaining, running, start, pause, reset, setRemaining } = useCountdown(60);

  const tFormatted = format(Math.max(remaining, 0));

  // reproducir sonido al llegar a cero
  useEffect(() => {
    if (remaining === 0 && beepRef.current) {
      beepRef.current.play();
    }
  }, [remaining]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSet() {
    const [h, m, s] = input.split(':').map((n) => parseInt(n, 10));
    const totalSeconds = h * 3600 + m * 60 + s;
    setRemaining(totalSeconds * 100);
  }

  return (
    <section className="flex flex-col items-center gap-6">
      <audio ref={beepRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" preload="auto" />

      <div className="bg-amber-100 rounded-3xl border-8 border-gray-700 px-10 py-6 text-black font-mono select-none shadow-inner"
        style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}
        aria-label="display-cuanta-atras"
      >
        <span>{tFormatted.hours}:{tFormatted.minutes}:{tFormatted.seconds}</span>
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-36 text-center border border-gray-400 rounded-lg p-2 font-mono"
          aria-label="Tiempo (HH:MM:SS)"
        />
        <Button color="green" onClick={handleSet}>{t('reset')}</Button>
      </div>

      <div className="flex gap-6">
        {running ? (
          <Button color="yellow" onClick={pause}>{t('pause')}</Button>
        ) : (
          <Button color="green" onClick={start}>{t('start')}</Button>
        )}
        <Button color="red" onClick={() => reset()}>{t('reset')}</Button>
      </div>
    </section>
  );
}