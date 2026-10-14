function Menu({ onSelectMode }) {
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <p className="status">Choose a mode</p>
      <button className="restart" onClick={() => onSelectMode("pvp")}>
        Pass and Play
      </button>

      <button className="restart" onClick={() => onSelectMode("cpu")}>
        Play vs computer
      </button>
    </div>
  );
}

export default Menu;
