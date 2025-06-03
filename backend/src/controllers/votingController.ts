import { Request, Response } from "express";
import { pool } from "../db/init";

export async function getTools(req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT * FROM tools ORDER BY category, votes DESC",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tools" });
  }
}

export async function voteForTool(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE tools SET votes = votes + 1 WHERE id = $1 RETURNING *",
      [id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to vote for tool" });
  }
}
