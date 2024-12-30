// File: routes/quizRoutes.js
import express from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const quizRoutes = (pool) => {
    const router = express.Router();

    // Fetch all categories
    router.get('/categories', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM categories');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching categories' });
        }
    });


    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    // Generate questions by category
    router.get('/generate', async (req, res) => {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        try {
          const prompt = `provide 5 MCQ type question on topics realted to ${category} . also provide its answers`;
          const aiResponse = await model.generateContent({ prompt });
            res.json(aiResponse.data.questions);
        } catch (err) {
            res.status(500).json({ error: 'Error generating questions' });
        }
    });

    return router;
};

export default quizRoutes;
