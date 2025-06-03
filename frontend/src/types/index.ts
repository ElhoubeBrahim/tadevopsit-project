export interface Progress {
  id: number;
  day: number;
  completed: boolean;
  feedback: string | null;
  completed_at: string | null;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  favorites: number;
}

export interface Tool {
  id: number;
  name: string;
  category: string;
  votes: number;
}
