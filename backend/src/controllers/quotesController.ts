import { Request, Response } from "express";
import { pool } from "../db/init";

export async function getQuotes(req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT * FROM quotes ORDER BY favorites DESC",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
}

export async function getRandomQuote(req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1",
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random quote" });
  }
}

export async function favoriteQuote(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE quotes SET favorites = favorites + 1 WHERE id = $1 RETURNING *",
      [id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to favorite quote" });
  }
}
