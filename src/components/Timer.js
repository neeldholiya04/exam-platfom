
import React, { useEffect } from 'react';
import useExamStore from '../store/examStore';

const Timer = () => {
  const { timeRemaining, decrementTime, completeExam } = useExamStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        decrementTime();
      } else {
        clearInterval(timer);
        completeExam();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, decrementTime, completeExam]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h2>Time Remaining</h2>
      <div className="time-display">{formatTime(timeRemaining)}</div>
    </div>
  );
};

export default Timer;