import "./App.css";
import { useState } from "react";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { calculateWinner, pickComputerMove } from "./utils/gameLogic";

function App() {
  const [mode, setMode] = useState(null);

  if (mode === null) {
    return <Menu onSelectMode={setMode} />;
  }

  return <Game mode={mode} onMenu={() => setMode(null)} />;
}

export default App;
