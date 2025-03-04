import { Card } from "@lib/types/cards";

import styles from "./GameCard.module.css";

export const GameCard = (props: Card) => {
  const { rank, suit } = props;
  return (
    <div className={styles.gameCard}>
      <div
        className={styles.rank}
        style={{
          color: suit.color,
        }}
      >
        {rank.name}
      </div>
      <div
        className={styles.suit}
        style={{
          color: suit.color,
        }}
      >
        {suit.symbol}
      </div>
    </div>
  );
};
