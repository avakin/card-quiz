import { Rank, Suit } from "@lib/types/cards";

export const RANKS: Rank[] = [
  {
    name: "2",
    value: "2",
  },
  {
    name: "3",
    value: "3",
  },
  {
    name: "4",
    value: "4",
  },
  {
    name: "5",
    value: "5",
  },
  {
    name: "6",
    value: "6",
  },
  {
    name: "7",
    value: "7",
  },
  {
    name: "8",
    value: "8",
  },
  {
    name: "9",
    value: "9",
  },
  {
    name: "10",
    value: "T",
  },
  {
    name: "J",
    value: "J",
  },
  {
    name: "Q",
    value: "Q",
  },
  {
    name: "K",
    value: "K",
  },
  {
    name: "A",
    value: "A",
  },
];

export const SUITS: Suit[] = [
  {
    name: "Hearts",
    symbol: "♥",
    value: "h",
    color: "#ff0000",
  },
  {
    name: "Diamonds",
    symbol: "♦",
    color: "#ff0000",
    value: "d",
  },
  {
    name: "Clubs",
    symbol: "♣",
    color: "#000000",
    value: "c",
  },
  {
    name: "Spades",
    symbol: "♠",
    color: "#000000",
    value: "s",
  },
];

export const HANDS = [
  "High Card",
  "Pair",
  "Two Pair",
  "Three of a Kind",
  "Straight",
  "Flush",
  "Full House",
  "Four of a Kind",
  "Straight Flush",
  "Royal Flush",
];

export const APP = {
  handLng: 5,
  health: 100,
  healthStep: 5,
  pauseTime: 3,
  resultsStorageKey: "leaderboard",
  routes: {
    home: "/",
    leaderboard: "/leaderboard",
    game: "/game",
    notFound: "*",
  },

  labels: {
    playGame: "Play Game",
    playAgain: "Play again",
    leaderboard: "Leaderboard",
    guessCards: "Guess the cards",
    score: "Score",
    attempt: "Attempt",
    correct: "correct",
    wrong: "wrong",
    gain: "gain",
    lose: "lose",
  },
};
