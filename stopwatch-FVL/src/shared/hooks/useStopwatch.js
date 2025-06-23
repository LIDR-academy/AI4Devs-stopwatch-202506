import { useState, useRef, useCallback } from 'react';

export default function useStopwatch() {
  const [elapsed, setElapsed] = useState(0); // centisegundos
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 10);
  }, [running]);

  const stop = useCallback(() => {
    if (!running) return;
    setRunning(false);
    clearInterval(intervalRef.current);
  }, [running]);

  const reset = useCallback(() => {
    setElapsed(0);
    clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  return { elapsed, running, start, stop, reset };
}