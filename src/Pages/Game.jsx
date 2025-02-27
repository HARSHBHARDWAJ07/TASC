import React, { useState, useEffect, useCallback } from "react";
import { fetchQuestions } from "../Components/utils/api";
import Question from "../Components/Question";
import "./CSS/Game.css";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");
  const [unlockedLevels, setUnlockedLevels] = useState(["easy"]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetGameState = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  }, []);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchQuestions(category, difficulty);
      setQuestions(data.questions);
      resetGameState();
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  }, [category, difficulty, resetGameState]);

  useEffect(() => {
    if (gameStarted) {
      loadQuestions();
    }
  }, [gameStarted, loadQuestions]);

  const handleAnswer = (points) => {
    setScore((prevScore) => prevScore + points);

    if (currentQuestionIndex + 1 < 10) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameOver(true);
      handleLevelUnlock();
    }
  };

  const handleLevelUnlock = async () => {
    if (score >= 60) {
      const levels = ["easy", "medium", "hard", "impossible"];
      const nextLevel = levels[levels.indexOf(difficulty) + 1];

      if (nextLevel && !unlockedLevels.includes(nextLevel)) {
        setUnlockedLevels((prevLevels) => [...prevLevels, nextLevel]);

        try {
          await fetch(`/api/questions/updatePoints`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ points: 1 }),
          });
          alert(
            `Congratulations! You've unlocked ${nextLevel.toUpperCase()} level and earned a point.`
          );
        } catch (error) {
          console.error("Failed to update user points:", error);
        }
      }
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setGameStarted(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    if (unlockedLevels.includes(newDifficulty)) {
      setDifficulty(newDifficulty);
      setGameStarted(false);
    } else {
      alert(
        `You need to score at least 60 in ${difficulty.toUpperCase()} to unlock this level.`
      );
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="container">
      <div className="headerSection">
        <div className="header">
          Enhance your knowledge by solving real life scenario based quiz
        </div>
        <div className="categoryLabel">
          <label htmlFor="category-section" className="sr-only">
            Select category
          </label>
          Select category:
        </div>

        {!gameStarted && (
          <div>
            <div className="categoryButtonsWrapper">
              {[
                "investment and saving ",
                "Debt management",
                "Credit scores",
                "Budgeting",
                "Taxes",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="categoryButton"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="difficultyLabel">
              <label htmlFor="difficulty-section" className="sr-only">
                Select difficulty
              </label>
              Select difficulty:
            </div>
            <div className="difficultyButtonsWrapper">
              {["easy", "medium", "hard", "impossible"].map((level) => (
                <button
                  key={level}
                  disabled={!unlockedLevels.includes(level)}
                  onClick={() => handleDifficultyChange(level)}
                  className="difficultyButton"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <div className="startButtonWrapper">
              <button
                onClick={handleStartGame}
                className="startButton"
                aria-disabled={!category || !difficulty}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {gameStarted && loading && <p>Loading questions...</p>}

        {gameStarted && questions.length > 0 && !gameOver && (
          <Question
            data={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        )}

        {gameOver && (
          <div className="gameOverContainer">
            <div className="gameOverText">Game Over!</div>
            <div className="scoreText">Your Score: {score}</div>
            <button onClick={() => setGameStarted(false)} className="backButton">
              Back to Levels
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
