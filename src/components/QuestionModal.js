import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { Clock, Mic } from 'react-bootstrap-icons';
import '../style/QuestionModal.css';

function QuestionModal() {
  const screens = [
    { type: 'instruction', title:"Instruction", content: 'Welcome! This is the instruction screen.' },
    { type: 'question', title:"1", content: 'What is your favorite programming language?' },
    { type: 'question', title:"2", content: 'Explain the concept of recursion.' },
    { type: 'question', title:"3", content: 'What is the difference between let and var in JavaScript?' },
    { type: 'question', title:"4", content: 'How do you create a new object in JavaScript?' },
    { type: 'question', title:"5", content: 'What is the purpose of the "this" keyword in JavaScript?' },
    { type: 'question', title:"6", content: 'Explain the concept of asynchronous programming.' },
    { type: 'question', title:"7", content: 'What is the difference between == and === in JavaScript?' },
    { type: 'question', title:"8", content: 'How do you create a new object in JavaScript?' },
    { type: 'question', title:"9", content: 'What is the purpose of the "this" keyword in JavaScript?' },
    { type: 'question', title:"10", content: 'Explain the concept of asynchronous programming.' },
    { type: 'question', title:"11", content: 'What is the difference between == and === in JavaScript?' },
    { type: 'question', title:"12", content: 'How do you create a new object in JavaScript?' }
  ];

  const PREP_TIME = 3; // 30 seconds
  const RECORD_TIME = 60; // 1 minute

  const [currentScreen, setCurrentScreen] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PREP_TIME);
  const [isPrep, setIsPrep] = useState(true);

  useEffect(() => {
    // Reset timer when screen changes
    setTimeLeft(PREP_TIME);
    setIsPrep(true);
  }, [currentScreen]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(prevTime => prevTime - 1);
      } else if (isPrep) {
        setIsPrep(false);
        setTimeLeft(RECORD_TIME);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPrep]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const screen = screens[currentScreen];

  return (
    <Modal show={true} fullscreen={true}>
      <Modal.Header>
        <Modal.Title>{screen.type === 'instruction' ? 'Instructions' : `Question ${screen.title}` }</Modal.Title>
        <div className="d-flex align-items-center">
          <span className="me-3">Prep: {formatTime(PREP_TIME)}</span>
          <span className="me-3">Record: {formatTime(RECORD_TIME)}</span>
          <Button variant="primary" onClick={handleNext}>Next</Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>{screen.content}</p>
        {screen.type === 'question' && (
          <Alert variant="info" className="timer-popup">
            <div className="timer-icon">
              {isPrep ? <Clock size={40} /> : <Mic size={40} />}
            </div>
            <div className="timer-info">
              <div className="timer-text">
                {isPrep ? 'Preparation' : 'Recording'}
              </div>
              <div className="timer-countdown">
                {formatTime(timeLeft)}
              </div>
            </div>
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleBack}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionModal;