import { useState, useRef, useCallback, useEffect } from 'react';

export default function useCountdown(initialSeconds = 60) {
  const [remaining, setRemaining] = useState(initialSeconds * 100); // centisegundos
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (running || remaining <= 0) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 10);
  }, [running, remaining]);

  const pause = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback((newSeconds = initialSeconds) => {
    clearInterval(intervalRef.current);
    setRemaining(newSeconds * 100);
    setRunning(false);
  }, [initialSeconds]);

  // parar al llegar a 0
  useEffect(() => {
    if (remaining <= 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  }, [remaining]);

  return { remaining, running, start, pause, reset, setRemaining };
}