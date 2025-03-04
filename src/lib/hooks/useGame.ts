import { useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  generateAnswers,
  generateHand,
  saveStatsToStorage,
} from "@lib/utils/helpers";
import { APP } from "@lib/utils/constants";
import { Answer, Card } from "@lib/types/cards";

export const useGame = () => {
  const interval = useRef<number | null>(null);
  const pauseInterval = useRef<number | null>(null);

  const redirect = useNavigate();

  const [hp, setHp] = useState(APP.health);
  const [stats, setStats] = useState(0);
  const [hand, setHand] = useState<Card[]>([]);
  const [pause, setPause] = useState(APP.pauseTime);
  const [result, showResult] = useState<Answer | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // generate hand
  const nextHand = () => {
    const hand = generateHand();

    setHand(hand);
  };

  // and answers for hand
  const getAnswers = useCallback(() => {
    const result = generateAnswers(hand);
    setAnswers(result);
  }, [hand]);

  // handle answer and decrement/increment hp accordingly
  const onAnswer = (answer: Answer) => {
    if (answer.isCorrect) {
      setHp((prev) =>
        prev + APP.healthStep > APP.health ? APP.health : prev + APP.healthStep
      );
      // while incrementing we are calculating correct score for future leaderboard
      incrementScore();
    } else {
      setHp((prev) => (prev - APP.healthStep < 0 ? 0 : prev - APP.healthStep));
    }

    // after computing result pausing game to show result of answer
    onPauseGame(answer);
  };

  const decrementHp = () => {
    setHp((prev) => prev - 1);
  };

  const incrementScore = () => {
    setStats((prev) => prev + 1);
  };

  const onPauseGame = (answer: Answer) => {
    // while pausing game we are stoping game time to clear with user
    if (interval.current) {
      clearInterval(interval.current);
    }

    // decrementing pause time
    pauseInterval.current = setInterval(
      () => setPause((prev) => prev - 1),
      1000
    );

    // at the moment of pause, we are showing the result
    showResult(answer);
  };

  const onContinueGame = useCallback(() => {
    // hiding result
    showResult(null);

    // removing pause interval
    if (pauseInterval.current) {
      clearInterval(pauseInterval.current);
    }

    // and continue decrementing game time
    interval.current = setInterval(decrementHp, 1000);

    // showing next hand
    nextHand();

    // resetting pause time
    setPause(APP.pauseTime);
  }, []);

  const onFinishGame = useCallback(() => {
    const result = { stats, timestamp: new Date().valueOf() };
    saveStatsToStorage(result);
    redirect(APP.routes.leaderboard);
  }, [stats, redirect]);

  useEffect(() => {
    nextHand();
    interval.current = setInterval(decrementHp, 1000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  useEffect(() => {
    getAnswers();
  }, [getAnswers]);

  useEffect(() => {
    if (!pause) {
      onContinueGame();
    }
  }, [pause, onContinueGame]);

  useEffect(() => {
    if (!hp) {
      onFinishGame();
    }
  }, [hp, onFinishGame]);

  return {
    hp,
    hand,
    result,
    answers,
    nextHand,
    onAnswer,
  };
};
