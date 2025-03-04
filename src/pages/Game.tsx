import { Container } from "@components/Container";
import { HandResult } from "@components/HandResult";
import { Table } from "@components/Table";

import { useGame } from "@lib/hooks/useGame";

export const Game = () => {
  const { hp, hand, answers, onAnswer, result } = useGame();

  return (
    <Container>
      {result ? (
        <HandResult answer={result} />
      ) : (
        <>
          <div style={{ textAlign: "right" }}> Time: {hp}s</div>
          <Table cards={hand} />
          <Container
            style={{
              gap: "0.5rem",
              alignSelf: "center",
            }}
          >
            {answers.map((answer: { name: string; isCorrect: boolean }) => {
              return (
                <button key={answer.name} onClick={() => onAnswer(answer)}>
                  {answer.name}
                </button>
              );
            })}
          </Container>
        </>
      )}
    </Container>
  );
};
