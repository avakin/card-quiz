import { Hand } from "pokersolver";

import { Answer, Card, Hand as HandType, Rank, Suit } from "@lib/types/cards";
import { APP, HANDS, RANKS, SUITS } from "@lib/utils/constants";

export const generateHand = (length: number = APP.handLng) => {
  const hand: Card[] = [];

  for (let index = 0; hand.length < length; index++) {
    const rank = RANKS[getRandomIndex(RANKS.length)];
    const suit = SUITS[getRandomIndex(SUITS.length)];
    const value = getCard(rank, suit);

    if (!hand.find((card) => card.computed === value)) {
      hand.push({ rank, suit, computed: value });
    }
  }
  return hand;
};

export const generateAnswers = (hand: HandType): Answer[] => {
  if (!hand?.length) return [];

  const correct = Hand.solve(hand.map((el) => el.computed)).name;
  const answers = [{ name: correct, isCorrect: true }];

  for (let index = 0; answers.length <= 2; index++) {
    const answer = HANDS[getRandomIndex(HANDS.length)];
    if (!answers.some((el) => el.name === answer)) {
      answers.push({ name: answer, isCorrect: false });
    }
  }

  return answers.sort(() => Math.random() - Math.random());
};

export const getRandomIndex = (length: number = 0) => {
  return Math.floor(Math.random() * length);
};

export const getCard = (rank: Rank, suit: Suit) => {
  return `${rank.value}${suit.value}`;
};

export const saveStatsToStorage = (stats: {
  stats: number;
  timestamp: number;
}) => {
  const prevStats = localStorage.getItem("leaderboard");
  const statsArr = prevStats ? JSON.parse(prevStats) : [];
  statsArr.push(stats);
  localStorage.setItem("leaderboard", JSON.stringify(statsArr));
};
