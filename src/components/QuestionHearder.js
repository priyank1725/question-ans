import React, { useState, useEffect } from 'react';
import '../style/QuestionHeader.css'; // We'll create this file for styling

function QuestionHeader({ questionName, preparationTime, recordingTime }) {
  const [prepTimeLeft, setPrepTimeLeft] = useState(preparationTime);
  const [recordTimeLeft, setRecordTimeLeft] = useState(recordingTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (prepTimeLeft > 0) {
        setPrepTimeLeft(prevTime => prevTime - 1);
      } else if (recordTimeLeft > 0) {
        setRecordTimeLeft(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prepTimeLeft, recordTimeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="question-header">
      <h2>{questionName}</h2>
      <div className="timers">
        <span>Prep: {formatTime(prepTimeLeft)}</span>
        <span>Record: {formatTime(recordTimeLeft)}</span>
      </div>
      <div className="buttons">
        <button className="back-button">Back</button>
        <button className="next-button">Next</button>
      </div>
    </div>
  );
}

export default QuestionHeader;