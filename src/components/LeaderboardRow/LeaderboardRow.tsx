import { Container } from "@components/Container";

import { AttemptResult } from "@lib/types/cards";
import { APP } from "@lib/utils/constants";

interface Row extends AttemptResult {
  index: number;
}

export const LeaderboardRow = (props: Row) => {
  const { timestamp, stats, index } = props;
  return (
    <Container
      style={{
        flexDirection: "row",
        gap: "1.75rem",
      }}
    >
      <div style={{ whiteSpace: "nowrap" }}>
        {APP.labels.attempt} - #{index}
      </div>
      <div style={{ whiteSpace: "nowrap" }}>
        {APP.labels.score} - {stats}
      </div>
      <div>{new Date(timestamp).toLocaleString()}</div>
    </Container>
  );
};
