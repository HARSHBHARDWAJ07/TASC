import pkg from "pg";
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



export const fetchUserProgress = async (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const result = await pool.query(
      "SELECT category_saving, category_taxes, category_credit, category_debtmanagement, category_budgeting FROM user_points WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User progress not found." });
    }

    const progress = result.rows[0];
    const difficulties = Object.keys(progress).reduce((acc, category) => {
      const points = progress[category];
      let difficulty = "easy";

      if (points === 1) difficulty = "medium";
      else if (points === 2) difficulty = "hard";

      acc[category] = difficulty;
      return acc;
    }, {});

    res.status(200).json({ progress: difficulties });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    next(error);
  }
};


export const updateUserCategoryPoints = async (req, res, next) => {
  const { userId, category, increment } = req.body;

  if (!userId || !category || typeof increment !== "number") {
    return res.status(400).json({ error: "User ID, category, and increment value are required." });
  }

  try {
    const column = `category_${category}`; 

    const existingEntry = await pool.query(
      "SELECT * FROM user_points WHERE user_id = $1",
      [userId]
    );

    if (existingEntry.rows.length > 0) {
    
      const updatedPoints = await pool.query(
        `UPDATE user_points SET ${column} = LEAST(${column} + $1, 2) WHERE user_id = $2 RETURNING ${column}`,
        [increment, userId]
      );
      res.status(200).json({ success: true, points: updatedPoints.rows[0][column] });
    } else {
     
      const insertQuery = `
        INSERT INTO user_points (user_id, ${column}) VALUES ($1, $2)
        RETURNING ${column}
      `;
      const newPoints = await pool.query(insertQuery, [userId, increment]);
      res.status(200).json({ success: true, points: newPoints.rows[0][column] });
    }
  } catch (error) {
    console.error("Error updating category points:", error);
    next(error);
  }
};
