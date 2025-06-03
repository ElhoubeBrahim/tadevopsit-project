import { Request, Response } from "express";
import { pool } from "../db/init";

export async function getProgress(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM progress ORDER BY day");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
}

export async function updateProgress(req: Request, res: Response) {
  try {
    const { day } = req.params;
    const { completed, feedback } = req.body;

    const completed_at = completed ? new Date() : null;

    const result = await pool.query(
      "UPDATE progress SET completed = $1, feedback = $2, completed_at = $3 WHERE day = $4 RETURNING *",
      [completed, feedback, completed_at, day],
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
}
