import type { Progress, Quote, Tool } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Progress API
export const progressAPI = {
  getAll: async (): Promise<Progress[]> => {
    const response = await fetch(`${API_BASE_URL}/progress`);
    if (!response.ok) throw new Error("Failed to fetch progress");
    return response.json();
  },

  update: async (
    day: number,
    data: { completed: boolean; feedback: string | null },
  ): Promise<Progress> => {
    const response = await fetch(`${API_BASE_URL}/progress/${day}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update progress");
    return response.json();
  },
};

// Quotes API
export const quotesAPI = {
  getAll: async (): Promise<Quote[]> => {
    const response = await fetch(`${API_BASE_URL}/quotes`);
    if (!response.ok) throw new Error("Failed to fetch quotes");
    return response.json();
  },

  getRandom: async (): Promise<Quote> => {
    const response = await fetch(`${API_BASE_URL}/quotes/random`);
    if (!response.ok) throw new Error("Failed to fetch random quote");
    return response.json();
  },

  favorite: async (id: number): Promise<Quote> => {
    const response = await fetch(`${API_BASE_URL}/quotes/${id}/favorite`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Failed to favorite quote");
    return response.json();
  },
};

// Voting API
export const votingAPI = {
  getAll: async (): Promise<Tool[]> => {
    const response = await fetch(`${API_BASE_URL}/voting`);
    if (!response.ok) throw new Error("Failed to fetch tools");
    return response.json();
  },

  vote: async (id: number): Promise<Tool> => {
    const response = await fetch(`${API_BASE_URL}/voting/${id}/vote`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Failed to vote for tool");
    return response.json();
  },
};
