import React, { useCallback } from 'react';
import "./Timer.css";

export default function Timer({time}) {

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className='retro-timer'>
      Tempo: {formatTime(time)}
    </div>
  );
}