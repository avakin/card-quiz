import { Hand } from "pokersolver";

import { Answer, Card, Hand as HandType, Rank, Suit } from "@lib/types/cards";
import { APP, HANDS, RANKS, SUITS } from "@lib/utils/constants";

export const generateHand = () => {
  const suit = SUITS[getRandomIndex(SUITS.length)];
  const generators = [
    generateRandomHand,
    generateFullHouse,
    generateStraightFlushOrStraight,
    generateRandomHand,
    () => generateStraightFlushOrStraight(suit),
    generateFlush,
    generateRandomHand,
    generateRandomHand,
  ];

  const random = generators[getRandomIndex(generators.length)];

  return random();
};

export const generateRandomHand = () => {
  const hand: Card[] = [];

  for (let index = 0; hand.length < APP.handLng; index++) {
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

export const getUniqueRandom = (index: number, length: number) => {
  let random = getRandomIndex(length);

  while (random === index) {
    random = getUniqueRandom(random, length);
  }

  return random;
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

export const generateFullHouse = () => {
  const hand: Card[] = [];
  const threeCardsRank = RANKS[getRandomIndex(RANKS.length)];

  const indexOfThree = RANKS.findIndex(
    (el) => el.value === threeCardsRank.value
  );

  const twoCardsRank = RANKS[getUniqueRandom(indexOfThree, RANKS.length)];

  const addCards = (rank: Rank, count: number) => {
    while (hand.length < count) {
      const suit = SUITS[getRandomIndex(SUITS.length)];
      const value = getCard(rank, suit);

      if (!hand.find((card) => card.computed === value)) {
        hand.push({ rank, suit, computed: value });
      }
    }
  };

  addCards(threeCardsRank, 3);
  addCards(twoCardsRank, 5);

  return hand;
};

export const generateStraightFlushOrStraight = (suitConfig?: Suit) => {
  const startIndex = getRandomIndex(RANKS.length - 5);
  const hand: Card[] = [];
  const ranks = RANKS.slice(startIndex, startIndex + 5);

  for (let i = 0; hand.length < 5; i++) {
    const suit = suitConfig || SUITS[getRandomIndex(SUITS.length)];
    const rank = ranks[i];
    const value = getCard(rank, suit);

    if (!hand.find((card) => card.computed === value)) {
      hand.push({ rank, suit, computed: value });
    }
  }

  return hand;
};

export const generateFlush = () => {
  const hand: Card[] = [];
  const suit = SUITS[getRandomIndex(SUITS.length)];

  for (let index = 0; hand.length < APP.handLng; index++) {
    const rank = RANKS[getRandomIndex(RANKS.length)];
    const value = getCard(rank, suit);

    if (!hand.find((card) => card.computed === value)) {
      hand.push({ rank, suit, computed: value });
    }
  }

  return hand;
};
