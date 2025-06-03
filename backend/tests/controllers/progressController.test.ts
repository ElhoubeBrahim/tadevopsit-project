import { Request, Response } from "express";
import {
  getProgress,
  updateProgress,
} from "../../src/controllers/progressController";
import { pool } from "../../src/db/init";
import { QueryResult } from "pg";

// Mock the pool
const mockPool = pool as jest.Mocked<typeof pool>;

describe("Progress Controller", () => {
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

  describe("getProgress", () => {
    it("should return all progress data", async () => {
      const mockProgressData = [
        { id: 1, day: 1, completed: false, feedback: null, completed_at: null },
        {
          id: 2,
          day: 2,
          completed: true,
          feedback: "Great!",
          completed_at: "2024-01-01",
        },
      ];

      const mockQueryResult: Partial<QueryResult> = {
        rows: mockProgressData,
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await getProgress(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT * FROM progress ORDER BY day",
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockProgressData);
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await getProgress(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch progress",
      });
    });
  });

  describe("updateProgress", () => {
    beforeEach(() => {
      mockReq = {
        params: { day: "5" },
        body: { completed: true, feedback: "Docker is awesome!" },
      };
    });

    it("should update progress with completion and feedback", async () => {
      const mockUpdatedProgress = {
        id: 5,
        day: 5,
        completed: true,
        feedback: "Docker is awesome!",
        completed_at: "2024-01-01T10:00:00Z",
      };

      const mockQueryResult: Partial<QueryResult> = {
        rows: [mockUpdatedProgress],
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await updateProgress(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "UPDATE progress SET completed = $1, feedback = $2, completed_at = $3 WHERE day = $4 RETURNING *",
        [true, "Docker is awesome!", expect.any(Date), "5"],
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedProgress);
    });

    it("should handle uncompleting a day", async () => {
      mockReq.body = { completed: false, feedback: null };
      const mockUpdatedProgress = {
        id: 5,
        day: 5,
        completed: false,
        feedback: null,
        completed_at: null,
      };

      const mockQueryResult: Partial<QueryResult> = {
        rows: [mockUpdatedProgress],
      };

      // @ts-ignore
      mockPool.query.mockResolvedValue(mockQueryResult);

      await updateProgress(mockReq as Request, mockRes as Response);

      expect(mockPool.query).toHaveBeenCalledWith(
        "UPDATE progress SET completed = $1, feedback = $2, completed_at = $3 WHERE day = $4 RETURNING *",
        [false, null, null, "5"],
      );
    });

    it("should handle database errors", async () => {
      // @ts-ignore
      mockPool.query.mockRejectedValue(new Error("Database error"));

      await updateProgress(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to update progress",
      });
    });
  });
});
