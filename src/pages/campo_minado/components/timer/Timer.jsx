import React, {useEffect,useState, useRef} from "react";

export default function Timer({isActive,reset, onUpdate}) {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
      if (isActive) {
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds + 1;
            onUpdate(newSeconds);
            return newSeconds;
          });
        }, 1000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [isActive, onUpdate]);

    useEffect(() => {
      setSeconds(0);
    }, [reset]);

  
    return (
      <div className="timer">
        Tempo: {Math.floor(seconds / 60)}:{("0" + (seconds % 60)).slice(-2)}
      </div>
    );
}