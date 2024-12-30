// File: frontend/src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ userId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Fetch questions when component mounts
    axios.get('/api/quiz/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleSubmit = () => {
    // Submit answers
    const answerArray = questions.map((q, idx) => ({
      questionId: q.id,
      answer: answers[idx] || '',
      correct: answers[idx] === q.correctAnswer, // Example correct answer check
    }));

    axios.post('/api/quiz/submit', { userId, answers: answerArray })
      .then(response => setScore(response.data.score))
      .catch(error => console.error('Error submitting quiz:', error));
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question, idx) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <input
            type="text"
            onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
};

export default Quiz;
