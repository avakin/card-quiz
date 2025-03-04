import { useNavigate } from "react-router";

import { APP } from "@lib/utils/constants";
import { Container } from "@components/Container";

export const Home = () => {
  const navigate = useNavigate();

  const onPlayGame = () => {
    navigate(APP.routes.game);
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <h1>{APP.labels.guessCards}</h1>
      <div>
        <button onClick={onPlayGame}>{APP.labels.playGame}</button>
      </div>
    </Container>
  );
};
