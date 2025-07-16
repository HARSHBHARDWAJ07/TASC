import React, { useState } from "react";
import { evaluateAnswer } from "./utils/api";
import "./CSS/Question.css";

const Question = ({ data, onAnswer, onExit }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please provide an answer.");
      return;
    }
    try {
      console.log("Submitting data:", data);
      const { score } = await evaluateAnswer(
        data.question,
        data.financial_situation,
        answer
      );
      setFeedback(`Score: ${score}/10`);
      onAnswer(score);
    } catch (error) {
      console.error("Failed to evaluate answer:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };

  if (!data) {
    return <p>Loading question...</p>;
  }


  return (
    <div className="question-container">
      <div className="content-wrapper">
        <div className="header-section">
          <span className="scenario-pill">Scenario {data?.scenario || "N/A"}</span>
          <button onClick={handleExit} className="exit-button">
            ✕
          </button>
        </div>

        <div className="content-card">
          <div className="financial-situation">
            <h3>Financial Context</h3>
            <p>{data?.financial_situation || "No financial situation provided."}</p>
          </div>

          <div className="question-section">
            <h2>Question</h2>
            <p>{data?.question || "No question provided."}</p>
          </div>

          <div className="answer-section">
            <label htmlFor="quizAnswer" className="input-label">
              Your Response
            </label>
            <textarea
              id="quizAnswer"
              className="answer-textarea"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows="5"
            />
          </div>

          <div className="action-buttons">
            <button onClick={handleSubmit} className="submit-button">
              Submit Answer
            </button>
          </div>

          {feedback && (
            <div className="feedback-badge">
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question