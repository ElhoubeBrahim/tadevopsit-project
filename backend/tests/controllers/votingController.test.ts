import { Request, Response } from "express";
import { getTools, voteForTool } from "../../src/controllers/votingController";
import { pool } from "../../src/db/init";
import { QueryResult } from "pg";

const mockPool = pool as jest.Mocked<typeof pool>;

describe("Voting Controller", () => {
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

  describe("getTools", () => {
    it("should return all tools ordered by category and votes", async () => {
      const mockTools = [
        { id: 1, name: "Docker", category: "Containers", votes: 10 },
        { id: 2, name: "Kubernetes", category: "Containers", votes: 8 },
        { id: 3, name: "Jenkins", category: "CI/CD", votes: 15 },
      ];

      const mockQueryResult: Partial<QueryResult> = {
        rows: mockTools,
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await getTools(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT * FROM tools ORDER BY category, votes DESC",
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockTools);
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await getTools(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch tools",
      });
    });
  });

  describe("voteForTool", () => {
    beforeEach(() => {
      mockReq = { params: { id: "1" } };
    });

    it("should increment tool votes", async () => {
      const mockUpdatedTool = {
        id: 1,
        name: "Docker",
        category: "Containers",
        votes: 11,
      };

      const mockQueryResult: Partial<QueryResult> = {
        rows: [mockUpdatedTool],
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await voteForTool(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "UPDATE tools SET votes = votes + 1 WHERE id = $1 RETURNING *",
        ["1"],
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedTool);
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await voteForTool(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to vote for tool",
      });
    });
  });
});
