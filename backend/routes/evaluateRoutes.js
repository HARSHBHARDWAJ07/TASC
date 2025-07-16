import express from "express";
import { fetchQuestions, evaluateAnswer} from "../controllers/evaluateController.js";

const router = express.Router();

// Get questions based on difficulty
router.get("/questions", fetchQuestions);

// Evaluate an answer
router.post("/evaluate", evaluateAnswer);



export default router;