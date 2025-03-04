export interface Card {
  suit: Suit;
  rank: Rank;
  computed: string;
}

export interface Suit {
  name: string;
  symbol: string;
  color: "#000000" | "#ff0000";
  value: "h" | "d" | "c" | "s";
}

export interface Rank {
  name: string;
  value: string;
}

export type Hand = Card[];

export type AttemptResult = {
  timestamp: number;
  stats: number;
};

export type ResultsBoard = AttemptResult[];

export type Answer = {
  name: string;
  isCorrect: boolean;
};
