import React, { useState } from "react";
import { evaluateAnswer } from "./utils/api";

const Question = ({ data, onAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please provide an answer.");
      return;
    }
    try {
       
        console.log("Submitting data:", data); 
        const { score } = await evaluateAnswer(data.question, data.financial_situation, answer);
        setFeedback(`Score: ${score}/10`);
        onAnswer(score);
      
    } catch (error) {
      console.error("Failed to evaluate answer:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  if (!data) {
    // Show loading or a fallback message if data is not available
    return <p>Loading question...</p>;
  }

  return (
  <div className="flex overflow-hidden flex-col px-14 pt-10 pb-72 text-2xl font-semibold text-black bg-white max-md:px-5 max-md:py-24">
      <div className="self-start mt-4 max-md:mt-10 max-md:max-w-full">
      Scenario {data?.scenario || "N/A"}</div>
     
      <div className="self-start mt-14 max-md:mt-10 max-md:max-w-full">
        Financial Situation:{" "}
        {data?.financial_situation || "No financial situation provided."}
      </div>
      <div className="self-start mt-4">Question: {data?.question || "No question provided."}
      </div>
      <form>
      <label htmlFor="quizAnswer" className="sr-only">
        Submit your answer
      </label>
      <textarea
      className="px-5 pt-3.5 pb-16 mt-6 text-xl rounded-xl border border-black border-solid max-md:pr-5 max-md:max-w-full w-full"
        placeholder="Submit your answer...."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="4"
        cols="50"
      />
      </form>
      <div className="flex flex-wrap gap-5 justify-between mt-4 w-full text-stone-800 max-md:max-w-full">

      <button
        onClick={handleSubmit}
        className="gap-2.5 self-stretch px-2.5 py-4 bg-cyan-300 rounded-xl min-h-[65px]"
      >
        Submit Answer
      </button>
      </div>
      {feedback && <p style={{ marginTop: "10px" }}>{feedback}</p>}
    </div>
  ); 
};

export default Question;