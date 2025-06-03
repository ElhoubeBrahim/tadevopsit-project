import { Request, Response } from "express";
import {
  getQuotes,
  getRandomQuote,
  favoriteQuote,
} from "../../src/controllers/quotesController";
import { pool } from "../../src/db/init";
import { QueryResult } from "pg";

const mockPool = pool as jest.Mocked<typeof pool>;

describe("Quotes Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("getQuotes", () => {
    it("should return all quotes ordered by favorites", async () => {
      const mockQuotes = [
        {
          id: 1,
          text: "DevOps quote 1",
          author: "Author 1",
          category: "Culture",
          favorites: 5,
        },
        {
          id: 2,
          text: "DevOps quote 2",
          author: "Author 2",
          category: "Automation",
          favorites: 3,
        },
      ];

      const mockQueryResult: Partial<QueryResult> = {
        rows: mockQuotes,
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await getQuotes(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT * FROM quotes ORDER BY favorites DESC",
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockQuotes);
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await getQuotes(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch quotes",
      });
    });
  });

  describe("getRandomQuote", () => {
    it("should return a random quote", async () => {
      const mockRandomQuote = {
        id: 3,
        text: "You build it, you run it",
        author: "Werner Vogels",
        category: "Responsibility",
        favorites: 2,
      };

      const mockQueryResult: Partial<QueryResult> = {
        rows: [mockRandomQuote],
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await getRandomQuote(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1",
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockRandomQuote);
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await getRandomQuote(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch random quote",
      });
    });
  });

  describe("favoriteQuote", () => {
    beforeEach(() => {
      mockReq = { params: { id: "1" } };
    });

    it("should increment quote favorites", async () => {
      const mockUpdatedQuote = {
        id: 1,
        text: "DevOps quote",
        author: "Author",
        category: "Culture",
        favorites: 6,
      };

      const mockQueryResult: Partial<QueryResult> = {
        rows: [mockUpdatedQuote],
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await favoriteQuote(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "UPDATE quotes SET favorites = favorites + 1 WHERE id = $1 RETURNING *",
        ["1"],
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedQuote);
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await favoriteQuote(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to favorite quote",
      });
    });
  });
});
