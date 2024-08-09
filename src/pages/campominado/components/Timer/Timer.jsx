import React, { useState, useEffect } from 'react';
import './Timer.css';

export default function Timer({isActive, getTime, resetTimer}){
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
        getTime(seconds);
        clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if(resetTimer) setSeconds(0);
  },[resetTimer])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="retro-timer">
      {formatTime(seconds)}
    </div>
  );
};
