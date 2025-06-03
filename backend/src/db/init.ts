import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Please set it in your .env file or pass it as an environment variable if you are using Docker to run the application.",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDB() {
  try {
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        day INTEGER NOT NULL UNIQUE,
        completed BOOLEAN DEFAULT false,
        feedback TEXT,
        completed_at TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        author VARCHAR(255),
        category VARCHAR(100),
        favorites INTEGER DEFAULT 0
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        votes INTEGER DEFAULT 0
      );
    `);

    // Seed data if tables are empty
    await seedData();
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}

async function seedData() {
  // Seed progress days
  const progressCount = await pool.query("SELECT COUNT(*) FROM progress");
  if (parseInt(progressCount.rows[0].count) === 0) {
    for (let day = 1; day <= 30; day++) {
      await pool.query("INSERT INTO progress (day) VALUES ($1)", [day]);
    }
  }

  // Seed quotes
  const quotesCount = await pool.query("SELECT COUNT(*) FROM quotes");
  if (parseInt(quotesCount.rows[0].count) === 0) {
    const quotes = [
      {
        text: "There is no such thing as DevOps - it's a culture, not a tool",
        author: "Unknown",
        category: "Culture",
      },
      {
        text: "You build it, you run it",
        author: "Werner Vogels",
        category: "Responsibility",
      },
      {
        text: "Automate everything you can, monitor everything you automate",
        author: "DevOps Wisdom",
        category: "Automation",
      },
      {
        text: "Fail fast, learn faster",
        author: "DevOps Community",
        category: "Learning",
      },
      {
        text: "Infrastructure as Code: If it's not in Git, it doesn't exist",
        author: "DevOps Principle",
        category: "IaC",
      },
      {
        text: "Containers are not VMs, and that's the point",
        author: "Docker Community",
        category: "Containers",
      },
      {
        text: "Configuration management is the foundation of reliability",
        author: "SRE Handbook",
        category: "Configuration",
      },
      {
        text: "Monitor your monitors",
        author: "Monitoring Best Practice",
        category: "Monitoring",
      },
    ];

    for (const quote of quotes) {
      await pool.query(
        "INSERT INTO quotes (text, author, category) VALUES ($1, $2, $3)",
        [quote.text, quote.author, quote.category],
      );
    }
  }

  // Seed tools
  const toolsCount = await pool.query("SELECT COUNT(*) FROM tools");
  if (parseInt(toolsCount.rows[0].count) === 0) {
    const tools = [
      // CI/CD
      { name: "Jenkins", category: "CI/CD" },
      { name: "GitHub Actions", category: "CI/CD" },
      { name: "GitLab CI", category: "CI/CD" },
      { name: "CircleCI", category: "CI/CD" },
      // Containers
      { name: "Docker", category: "Containers" },
      { name: "Kubernetes", category: "Containers" },
      { name: "Docker Swarm", category: "Containers" },
      { name: "Podman", category: "Containers" },
      // Cloud
      { name: "AWS", category: "Cloud" },
      { name: "Azure", category: "Cloud" },
      { name: "Google Cloud", category: "Cloud" },
      { name: "DigitalOcean", category: "Cloud" },
      // Monitoring
      { name: "Prometheus", category: "Monitoring" },
      { name: "Grafana", category: "Monitoring" },
      { name: "Datadog", category: "Monitoring" },
      { name: "New Relic", category: "Monitoring" },
    ];

    for (const tool of tools) {
      await pool.query("INSERT INTO tools (name, category) VALUES ($1, $2)", [
        tool.name,
        tool.category,
      ]);
    }
  }
}
