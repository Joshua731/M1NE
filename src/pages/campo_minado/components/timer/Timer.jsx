import React, { useCallback } from 'react';

export default function Timer({time}) {

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);
  
    return (
      <div className="timer">
        Tempo: {formatTime(time)}
      </div>
    );
}