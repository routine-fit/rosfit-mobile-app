import { useEffect, useRef, useState } from 'react';

const useTimer = (initialValue: number = 0) => {
  const [time, setTime] = useState(initialValue);
  const [isPaused, setIsPaused] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const start = () => setIsPaused(false);
  const pause = () => setIsPaused(true);
  const reset = () => {
    setIsPaused(true);
    setTime(initialValue);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return {
    time,
    isPaused,
    start,
    pause,
    reset,
    formattedTime: formatTime(time),
  };
};

export default useTimer;
