import express from "express";
import {
  getQuotes,
  getRandomQuote,
  favoriteQuote,
} from "../controllers/quotesController";

const router = express.Router();

router.get("/", getQuotes);
router.get("/random", getRandomQuote);
router.put("/:id/favorite", favoriteQuote);

export default router;
