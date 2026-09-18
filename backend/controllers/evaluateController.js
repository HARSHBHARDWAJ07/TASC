import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import axios from "axios";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


pool.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsFilePath = path.join(__dirname, "../data/questions.json");


export const fetchQuestions = async (req, res, next) => {

  const { difficulty , category } = req.query;
  console.log("Query Parameters:", { category, difficulty });

  if (!category || !difficulty) {
    return res.status(400).json({ error: "Category and difficulty are required." });
  }
  
  try {
    
    const data = JSON.parse(fs.readFileSync(questionsFilePath, "utf-8"));
  
    console.log("Parsed JSON Data:", Object.keys(data)); // Should log ['category']
  
    // Trim query parameters
    const category = req.query.category.trim();
    const difficulty = req.query.difficulty.trim();
  
    console.log("Trimmed Query Parameters:", { category, difficulty });
  
    // Navigate through the "category" key
    const categoryData = data.category?.[category.trim()];
    const questions = categoryData?.difficulty_levels?.[difficulty.trim()];
  
    console.log("Category Data:", categoryData);
    console.log("Questions for Difficulty:", questions);
  
    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: "Questions not found for the specified category and difficulty." });
    }
  
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    next(error);
  }
  
  
};

// Evaluate an answer
export const evaluateAnswer = async (req, res, next) => {
  const { answer, question ,financial_situation} = req.body;

  console.log("Received Body:", req.body);

  if (!answer || !question || !financial_situation)  {
    return res.status(400).json({ error: "Both question and answer are required." });
  }
 
  const prompt = `i am preparing a finacial test to increase the financial knowledge . iwant you to be judge . i will give a question and a answer of it . you have to judge the answer on the relevance to the  question you just have to tell me point out of 10 , nothing else . you only have to give me number nothing else for example if the point is 6 you will give only the no. 6 . this is the question : ${financial_situation} and ${question} . this the answer : ${answer}`;
  console.log("Generated Prompt:", prompt);

  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await axios.post(
        "https://api.deepseek.com/chat/completions",
        {
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );

      const score = response.data.choices[0].message.content.trim();
      if (isNaN(score)) throw new Error("Invalid AI response");

      return res.status(200).json({ success: true, score });
    } catch (error) {
      const status = error.response?.status;
      const isRetryable = status === 503 || status === 429 || error.code === "ECONNABORTED";
      if (!isRetryable || attempt === maxAttempts) {
        return next(new Error(error.response?.data?.error?.message || error.message));
      }
      console.warn(`DeepSeek call failed (attempt ${attempt}/${maxAttempts}), retrying:`, error.message);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
