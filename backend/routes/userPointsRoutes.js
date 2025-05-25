import express from "express";
import { fetchUserProgress, updateUserCategoryPoints } from "../controllers/userPointsController.js";

const router = express.Router();

// Fetch user's progress
router.get("/progress", fetchUserProgress);

// Update user's points in a specific category
router.post("/updateCategoryPoints", updateUserCategoryPoints);

export default router;
