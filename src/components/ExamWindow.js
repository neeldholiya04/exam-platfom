import React, { useState, useCallback, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import useExamStore from '../store/examStore';
import Timer from './Timer';
import ViolationWarning from './ViolationWarning';
import Question from './Question';

const examQuestions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"]
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"]
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"]
  }
];

const ExamWindow = () => {
  const handle = useFullScreenHandle();
  const [showWarning, setShowWarning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const { 
    isExamStarted, 
    violationCount, 
    incrementViolation, 
    terminateExam, 
    completeExam,
    setAnswer,
    answers
  } = useExamStore();
  const [initialEntry, setInitialEntry] = useState(true);

  useEffect(() => {
    if (isExamStarted && initialEntry) {
      const timer = setTimeout(() => {
        handle.enter();
        setInitialEntry(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isExamStarted, initialEntry, handle]);

  const handleFullScreenChange = useCallback((state) => {
    setIsFullScreen(state);
    if (!state && isExamStarted && !initialEntry) {
      incrementViolation();
      if (violationCount === 0) {
        setShowWarning(true);
      } else {
        terminateExam();
      }
    }
  }, [isExamStarted, violationCount, incrementViolation, terminateExam, initialEntry]);

  const handleSubmit = () => {
    completeExam();
    handle.exit();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleAnswer = (questionId, selectedIndex) => {
    setAnswer(questionId, selectedIndex);
  };

  return (
    <FullScreen handle={handle} onChange={handleFullScreenChange}>
      <div className="exam-window">
        <h1>Exam in Progress</h1>
        <Timer />
        {showWarning && (
          <ViolationWarning 
            onClose={() => {
              setShowWarning(false);
              handle.enter();
            }} 
          />
        )}
        {isFullScreen && (
          <>
            <div className="exam-instructions">
              <h2>Exam Instructions</h2>
              <ul>
                <li>You have 30 minutes to complete this exam.</li>
                <li>There are {examQuestions.length} multiple-choice questions.</li>
                <li>You can navigate between questions using the Previous and Next buttons.</li>
                <li>You can change your answers at any time before submitting.</li>
                <li>Do not attempt to exit full-screen mode, or you will receive a warning.</li>
                <li>A second attempt to exit full-screen mode will terminate the exam.</li>
                <li>Click the "Submit Exam" button when you're finished or when time runs out.</li>
              </ul>
            </div>
            <div className="exam-questions">
              <Question 
                question={examQuestions[currentQuestionIndex]} 
                onAnswer={handleAnswer}
                selectedAnswer={answers[examQuestions[currentQuestionIndex].id]}
              />
              <div className="question-navigation">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                <button onClick={handleNextQuestion} disabled={currentQuestionIndex === examQuestions.length - 1}>Next</button>
              </div>
            </div>
            <button onClick={handleSubmit} className="submit-button">Submit Exam</button>
          </>
        )}
      </div>
    </FullScreen>
  );
};

export default ExamWindow;
