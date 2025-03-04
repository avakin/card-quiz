import { BrowserRouter, Route, Routes } from "react-router";

import { Game } from "@pages/Game";
import { Home } from "@pages/Home";
import { Leaderboard } from "@pages/Leaderboard";
import { APP } from "@lib/utils/constants";
import { NotFound } from "@pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP.routes.notFound} element={<NotFound />} />
        <Route path={APP.routes.home} element={<Home />} />
        <Route path={APP.routes.leaderboard} element={<Leaderboard />} />
        <Route path={APP.routes.game} element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
