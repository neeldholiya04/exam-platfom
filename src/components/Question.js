import React, { useState } from 'react';

const Question = ({ question, onAnswer, selectedAnswer }) => {
  return (
    <div className="question">
      <h3>{question.text}</h3>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={selectedAnswer === index}
                onChange={() => onAnswer(question.id, index)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
