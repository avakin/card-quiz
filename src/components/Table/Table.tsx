import { GameCard } from "@components/GameCard";
import { Card, Hand } from "@lib/types/cards";

import styles from "./Table.module.css";

export const Table = ({ cards = [] }: { cards: Hand }) => {
  return (
    <div className={styles.table}>
      {cards.map((el: Card) => (
        <GameCard key={el.computed} {...el} />
      ))}
    </div>
  );
};
