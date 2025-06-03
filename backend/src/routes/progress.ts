import express from "express";
import { getProgress, updateProgress } from "../controllers/progressController";

const router = express.Router();

router.get("/", getProgress);
router.put("/:day", updateProgress);

export default router;
