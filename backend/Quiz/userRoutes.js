// File: routes/userRoutes.js
import express from 'express';

const userRoutes = (pool) => {
    const router = express.Router();

    // Fetch user data
    router.get('/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching user data' });
        }
    });

    return router;
};

export default userRoutes;
