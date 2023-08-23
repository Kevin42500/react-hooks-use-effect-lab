import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Question'; 
import quiz from '../data/quiz';

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const [timeRemaining, setTimeRemaining] = useState(10); 

  useEffect(() => {
    let timer;

    const handleTimer = () => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        setTimeRemaining(10);
        handleQuestionAnswered(false);
      }
    };
    timer = setInterval(handleTimer, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining, currentQuestionId]);

  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      setCurrentQuestion(currentQuestionId + 1);
    } else {
      setCurrentQuestion(null);
    }
    if (correct) {
      setScore(score + 1);
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question question={currentQuestion} onAnswered={handleQuestionAnswered} />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
        <p>{timeRemaining} seconds remaining</p> {/* Display the timer */}
      </section>
    </main>
  );
}

export default App;
