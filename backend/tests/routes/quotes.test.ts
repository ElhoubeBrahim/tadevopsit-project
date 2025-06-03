import request from "supertest";
import express from "express";
import quotesRoutes from "../../src/routes/quotes";

jest.mock("../../src/controllers/quotesController", () => ({
  getQuotes: jest.fn((req, res) => res.json({ message: "getQuotes called" })),
  getRandomQuote: jest.fn((req, res) =>
    res.json({ message: "getRandomQuote called" }),
  ),
  favoriteQuote: jest.fn((req, res) =>
    res.json({ message: "favoriteQuote called" }),
  ),
}));

const app = express();
app.use(express.json());
app.use("/quotes", quotesRoutes);

describe("Quotes Routes", () => {
  it("GET /quotes should call getQuotes controller", async () => {
    const response = await request(app).get("/quotes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "getQuotes called" });
  });

  it("GET /quotes/random should call getRandomQuote controller", async () => {
    const response = await request(app).get("/quotes/random");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "getRandomQuote called" });
  });

  it("PUT /quotes/:id/favorite should call favoriteQuote controller", async () => {
    const response = await request(app).put("/quotes/1/favorite");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "favoriteQuote called" });
  });
});
