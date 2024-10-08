import React, { useState } from "react";
import useExamStore from "./store/examStore";
import ExamWindow from "./components/ExamWindow";
import "./App.css";

function App() {
  const {
    isExamStarted,
    isExamCompleted,
    isExamTerminated,
    startExam,
    resetExam,
    answers,
  } = useExamStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleStartExam = () => {
    setShowConfirmation(true);
  };

  const confirmStartExam = () => {
    setShowConfirmation(false);
    startExam();
  };

  const calculateScore = () => {
    const correctAnswers = { 1: 2, 2: 1, 3: 2 };
    let score = 0;
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      if (correctAnswers[questionId] === answerIndex) {
        score++;
      }
    });
    return score;
  };

  const totalQuestions = 3;

  return (
    <div className="App">
      {!isExamStarted && !isExamCompleted && !isExamTerminated && (
        <>
          <h1>Welcome to the Exam Platform</h1>
          <button onClick={handleStartExam}>Start Exam</button>
          {showConfirmation && (
            <div className="confirmation">
              <p>Are you sure you want to start the exam?</p>
              <button onClick={confirmStartExam}>Yes, start exam</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          )}
        </>
      )}
      {isExamStarted && <ExamWindow />}{" "}
      {(isExamCompleted || isExamTerminated) && (
        <div className="exam-report">
          <h2>Exam Report</h2>
          <p>Status: {isExamCompleted ? "Completed" : "Terminated"}</p>
          {isExamCompleted && (
            <p>
              Score: {calculateScore()} out of {totalQuestions} questions
              answered correctly
            </p>
          )}
          <button onClick={resetExam}>Restart Exam</button>
        </div>
      )}
    </div>
  );
}

export default App;
