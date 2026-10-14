import { useState } from "react";
import Square from "./Square";
import { calculateWinner, pickComputerMove } from "../utils/gameLogic";

function Game({ mode, onMenu }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isThinking) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);

    if (mode === "cpu") {
      if (!calculateWinner(nextSquares) && nextSquares.includes(null)) {
        setIsThinking(true);
        setTimeout(() => {
          const move = pickComputerMove(nextSquares);
          const afterComputer = nextSquares.slice();
          afterComputer[move] = "O";
          setSquares(afterComputer);
          setIsThinking(false);
        }, 500);
      }
    } else {
      setXIsNext(!xIsNext);
    }
  } // <-- handleClick ENDS here

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : [];

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "It's a draw!!";
  } else if (isThinking) {
    status = "Computer is thinking...";
  } else if (mode === "cpu") {
    status = "Your turn (X)";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <p className="status">{status}</p>
      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
            highlight={winningLine.includes(i)}
          />
        ))}
      </div>
      <button className="restart" onClick={handleRestart} disabled={isThinking}>
        Restart
      </button>
      <button className="restart" onClick={onMenu}>
        Menu
      </button>
    </div>
  );
}

export default Game;
