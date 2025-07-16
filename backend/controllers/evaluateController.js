import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { Pool } = pkg; 

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
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
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


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
 

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  if (!answer || !question || !financial_situation)  {
    return res.status(400).json({ error: "Both question and answer are required." });
  }
 
  try {
    const prompt = `i am preparing a finacial test to increase the financial knowledge . iwant you to be judge . i will give a question and a answer of it . you have to judge the answer on the relevance to the  question you just have to tell me point out of 10 , nothing else . you only have to give me number nothing else for example if the point is 6 you will give only the no. 6 . this is the question : ${financial_situation} and ${question} . this the answer : ${answer}`;
    console.log("Generated Prompt:", prompt);
    const result = await model.generateContent( prompt );
    console.log(result.response.text());
    const scores = result.response.text();
    const score = scores.toString();
    if (isNaN(score)) throw new Error("Invalid AI response");

    res.status(200).json({ success: true, score });
  } catch (error) {
    next(error);
  }
};
