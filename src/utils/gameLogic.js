


export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //console.log("checking line", i, lines[i]);

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  //console.log("---");
  return null;
}


/////////-------////////


export function pickComputerMove (squares) {
    const winMove = findWinningMove(squares, 'O')
    if(winMove !== null) return winMove

    //blocking x move

    const blockMove = findWinningMove(squares, 'X')
    if(blockMove !== null) return blockMove

    //take center
    if(squares[4] === null) return 4

    //take corner
    const corners = [0,2,6,8]
    for(let i = 0; i <corners.length; i++){
        if(squares[corners[i]] === null) return corners[i];
    }

    //random code
    const emptySquares =[]

    for(let i = 0; i < squares.length; i++){
        if(squares[i] === null) emptySquares.push(i)
    }
    if(emptySquares.length === 0) return null

    return emptySquares[Math.floor(Math.random() * emptySquares.length)]
}

//console.log(pickComputerMove(['X', 'O', null, 'X', null, 'O', null, null, 'X']))


export function findWinningMove (squares, player) {
    for(let i = 0; i < squares.length; i++) {
        if(squares[i] === null){
            const test = squares.slice()
            test[i] = player 
            const result = calculateWinner(test)
            if(result && result.winner === player) {
                return i
            }
        }
    }
    return null
}