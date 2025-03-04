import { useState, useTransition, useEffect } from "react";

import { Container } from "@components/Container";

import { fetchRandomWord } from "@lib/api";
import { Answer } from "@lib/types/cards";
import { APP } from "@lib/utils/constants";

export const HandResult = ({ answer }: { answer: Answer }) => {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const getWord = () => {
    startTransition(async () => {
      try {
        const result = await fetchRandomWord();
        setMessage(result.word);
      } catch (error) {
        console.log("Error while fetching random word:", error);
      }
    });
  };

  const renderMessage = () => {
    if (message && !isPending) {
      return `All ${message}s are restricted from tomorrow!`;
    }

    return "...";
  };
  useEffect(() => {
    getWord();
  }, []);
  return (
    <Container style={{ textAlign: "center" }}>
      <h2>
        Your answer is{" "}
        <span style={{ textTransform: "uppercase" }}>
          {answer.isCorrect ? APP.labels.correct : APP.labels.wrong}
        </span>
      </h2>
      <div>
        <p>
          You {answer.isCorrect ? APP.labels.gain : APP.labels.lose} 5 seconds
        </p>
        {renderMessage()}
      </div>
    </Container>
  );
};
