const Gameboard = (() => {
  let gameBoard = ['', '', '',
                   '', '', '',
                   '', '', ''];

  const updateBoard = (pos, player) => {
    gameBoard[pos] = player;
    console.log(gameBoard);
  }
  
  return { updateBoard };
})();

const Players = (() => {
  const playerX = 'X';
  const playerO = 'O';

  return { playerX, playerO };
})();

const GameManager = (() => {
  let winner = '';
  let _currentPlayerTurn = Players.playerX; // first player to take turn

  const start = () => {
    // loop until some checks are valid (matching 3 or tie)
    do { 
      let input = parseInt(prompt(`Player ${_currentPlayerTurn} turn: `));
      // update gameboard
      Gameboard.updateBoard(input, _currentPlayerTurn);
      // update _currentPlayerTurn
      _currentPlayerTurn = _currentPlayerTurn == Players.playerX ? Players.playerO : Players.playerX;
      console.log(`Next player is ${_currentPlayerTurn}`);
    } while (winner === '');
  };

  return { start };
})();