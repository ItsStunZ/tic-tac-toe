const Gameboard = (() => {
  let gameBoard = ['', '', '',
                   '', '', '',
                   '', '', ''];

  const updateBoard = (pos, player) => {
    gameBoard[pos] = player;
  }

  const isPosAvailable = (pos) => gameBoard[pos] === '';
  
  const checkForWinner = (player) => {
    // Horizontally
    if (gameBoard[0] === player && gameBoard[1] === player && gameBoard[2] === player ||
        gameBoard[3] === player && gameBoard[4] === player && gameBoard[5] === player ||
        gameBoard[6] === player && gameBoard[7]=== player && gameBoard[8] === player)
        return true;

    // Vertically
    if (gameBoard[0] === player && gameBoard[3] === player && gameBoard[6] === player ||
        gameBoard[1] === player && gameBoard[4] === player && gameBoard[7] === player ||
        gameBoard[2] === player && gameBoard[5]=== player && gameBoard[8] === player)
        return true;

    // Diagonol
    if (gameBoard[0] === player && gameBoard[4] === player && gameBoard[8] === player ||
        gameBoard[2] === player && gameBoard[4] === player && gameBoard[6] === player)
        return true;

    return false;
  }

  const getGameboard = () => gameBoard;
  
  return { updateBoard, checkForWinner, getGameboard, isPosAvailable};
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
      // ? Need to wait for valid input (check if pos of input is not taken)
      let input = parseInt(prompt(`Player ${_currentPlayerTurn} turn: `));
      // update gameboard
      Gameboard.updateBoard(input, _currentPlayerTurn);
      // check for winner
      const isWinner = Gameboard.checkForWinner(_currentPlayerTurn);
      if (isWinner) {
        winner = _currentPlayerTurn;
        alert(`Player ${winner} won the game!`);
        console.log(Gameboard.getGameboard());
        break;
      }
      // update _currentPlayerTurn
      _currentPlayerTurn = _currentPlayerTurn == Players.playerX ? Players.playerO : Players.playerX;
      console.log(`Next player is ${_currentPlayerTurn}`);
    } while (winner === '');
  };

  return { start };
})();

GameManager.start();