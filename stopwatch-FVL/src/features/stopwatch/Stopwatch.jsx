import React, { useEffect } from 'react';
import useStopwatch from '../../shared/hooks/useStopwatch';
import Button from '../../shared/components/Button';
import { useTranslation } from 'react-i18next';

function format(cs) {
  const centiseconds = cs % 100;
  const totalSeconds = Math.floor(cs / 100);
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

export default function Stopwatch() {
  const { t } = useTranslation();
  const { elapsed, running, start, stop, reset } = useStopwatch();

  useEffect(() => {
    function handler(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        running ? stop() : start();
      }
      if (e.key.toLowerCase() === 'r') reset();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [running, start, stop, reset]);

  const tFormatted = format(elapsed);

  return (
    <section className="flex flex-col items-center gap-6">
      <div
        className="bg-indigo-100 rounded-3xl border-8 border-gray-700 px-10 py-6 text-black font-mono select-none shadow-inner"
        style={{ fontSize: 'clamp(2rem, 8vw, 8rem)' }}
        aria-label="display-tiempo"
      >
        <span>{tFormatted.hours}:{tFormatted.minutes}:{tFormatted.seconds}</span>
        <span className="text-4xl align-top ml-3">{tFormatted.centiseconds}</span>
      </div>
      <div className="flex gap-6">
        {running ? (
          <Button color="yellow" onClick={stop}>{t('pause')}</Button>
        ) : (
          <Button color="green" onClick={start}>{t('start')}</Button>
        )}
        <Button color="red" onClick={reset}>{t('reset')}</Button>
      </div>
    </section>
  );
}