const Gameboard = (() => {
  let gameBoard = ['O', 'X', 'O',
                   'X', 'O', 'X',
                   'X', 'O', 'X'];

  const updateBoard = (pos, player) => {
    gameBoard[pos] = player;
  }
  
  const checkForWinner = () => {
    // Horizontal
    if (new Set([gameBoard[0], gameBoard[1], gameBoard[2]]).size === 1 || 
        new Set([gameBoard[3], gameBoard[4], gameBoard[5]]).size === 1 || 
        new Set([gameBoard[6], gameBoard[7], gameBoard[8]]).size === 1)
        return true;

    // Vertical
    if (new Set([gameBoard[0], gameBoard[3], gameBoard[6]]).size === 1 ||
        new Set([gameBoard[1], gameBoard[4], gameBoard[7]]).size === 1 ||
        new Set([gameBoard[2], gameBoard[5], gameBoard[8]]).size === 1)
        return true;

    // TODO: Add horizontal check
    return false;
  }

  const getGameboard = () => gameBoard();
  
  return { updateBoard, checkForWinner, getGameboard};
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
    //   let input = parseInt(prompt(`Player ${_currentPlayerTurn} turn: `));
      // update gameboard
    //   Gameboard.updateBoard(input, _currentPlayerTurn);
      // check for winner
      const isWinner = Gameboard.checkForWinner();
      if (isWinner) {
        winner = 'a';
        alert('Winner');
        console.log(GameManager.getGameBoard)
      }
      // update _currentPlayerTurn
      _currentPlayerTurn = _currentPlayerTurn == Players.playerX ? Players.playerO : Players.playerX;
      console.log(`Next player is ${_currentPlayerTurn}`);
    } while (winner === '');
  };

  return { start };
})();

GameManager.start();