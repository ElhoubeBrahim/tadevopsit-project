import request from "supertest";
import express, { Request, Response } from "express";
import progressRoutes from "../../src/routes/progress";

// Mock the controllers
jest.mock("../../src/controllers/progressController", () => ({
  getProgress: jest.fn((req: Request, res: Response) =>
    res.json({ message: "getProgress called" }),
  ),
  updateProgress: jest.fn((req: Request, res: Response) =>
    res.json({ message: "updateProgress called" }),
  ),
}));

const app = express();
app.use(express.json());
app.use("/progress", progressRoutes);

describe("Progress Routes", () => {
  it("GET /progress should call getProgress controller", async () => {
    const response = await request(app).get("/progress");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "getProgress called" });
  });

  it("PUT /progress/:day should call updateProgress controller", async () => {
    const response = await request(app)
      .put("/progress/5")
      .send({ completed: true, feedback: "Test feedback" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "updateProgress called" });
  });
});
