import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { LeaderboardRow } from "@components/LeaderboardRow";
import { Container } from "@components/Container";

import { APP } from "@lib/utils/constants";
import { AttemptResult, ResultsBoard } from "@lib/types/cards";

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<ResultsBoard>([]);

  const onPlayGame = () => {
    navigate(APP.routes.game);
  };

  const readStats = useCallback(() => {
    const prevStats = localStorage.getItem(APP.resultsStorageKey);

    let stats = [];

    try {
      stats = prevStats ? JSON.parse(prevStats) : [];
    } catch (error) {
      console.error(
        "Error occured during extracting leadrboard from storage",
        error
      );
    }

    setBoard(
      stats.sort(
        (a: AttemptResult, b: AttemptResult) => a.timestamp - b.timestamp
      )
    );
  }, []);

  useEffect(() => {
    readStats();
  }, [readStats]);

  return (
    <Container style={{ textAlign: "center" }}>
      <h1>{APP.labels.leaderboard}</h1>
      <div>
        {board.map((el: AttemptResult, i: number) => {
          return <LeaderboardRow key={i} index={i} {...el} />;
        })}
      </div>
      <div>
        <button onClick={onPlayGame}>{APP.labels.playAgain}</button>
      </div>
    </Container>
  );
};
