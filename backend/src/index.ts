import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import { initDB } from "./db/init";

import progressRoutes from "./routes/progress";
import quotesRoutes from "./routes/quotes";
import votingRoutes from "./routes/voting";

// Set up the port
const PORT = process.env.PORT || 3000;

// Create Express app and router
const app = express();
const router = express.Router();

// Middleware: CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Routes
router.use("/progress", progressRoutes);
router.use("/quotes", quotesRoutes);
router.use("/voting", votingRoutes);
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "TaDevOpsit API is running!" });
});

app.use("/api", router);

// Initialize DB and start server
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });
