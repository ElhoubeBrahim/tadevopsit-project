import request from "supertest";
import express from "express";
import votingRoutes from "../../src/routes/voting";

jest.mock("../../src/controllers/votingController", () => ({
  getTools: jest.fn((req, res) => res.json({ message: "getTools called" })),
  voteForTool: jest.fn((req, res) =>
    res.json({ message: "voteForTool called" }),
  ),
}));

const app = express();
app.use(express.json());
app.use("/voting", votingRoutes);

describe("Voting Routes", () => {
  it("GET /voting should call getTools controller", async () => {
    const response = await request(app).get("/voting");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "getTools called" });
  });

  it("PUT /voting/:id/vote should call voteForTool controller", async () => {
    const response = await request(app).put("/voting/1/vote");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "voteForTool called" });
  });
});
