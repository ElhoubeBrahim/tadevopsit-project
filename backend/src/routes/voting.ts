import express from "express";
import { getTools, voteForTool } from "../controllers/votingController";

const router = express.Router();

router.get("/", getTools);
router.put("/:id/vote", voteForTool);

export default router;
