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

  const resetBoard = () => {
    gameBoard = ['', '', '',
                 '', '', '',
                 '', '', ''];
    console.log('Gameboard has been reset.');
  }

  const getGameboard = () => gameBoard;
  
  return {
          updateBoard,
          checkForWinner,
          getGameboard,
          isPosAvailable,
          resetBoard
        };
})();

const Players = (() => {
  const playerX = 'X';
  const playerO = 'O';

  return { playerX, playerO };
})();

const HandleDOM = (() => {
  const gridCells = document.querySelectorAll('.grid__child');

  const setupDom = () => {
    // add event listeners to cells
    for (let i = 0; i < gridCells.length; i++) {

      // Click event
      gridCells[i].addEventListener('click', () => {
        if (!Gameboard.isPosAvailable(i)) return;
        console.log(`Clicked on grid cell ${i}`);
        GameManager.playTurn(i);
      });

      // hover event
      gridCells[i].addEventListener('mouseenter', () => {
        // Check if cell is available
        if (Gameboard.isPosAvailable(i)) {
          // toggle valid class
          gridCells[i].classList.add('valid')
          gridCells[i].classList.remove('invalid');
        } else {
          gridCells[i].classList.remove('valid')
          gridCells[i].classList.add('invalid');
        }
      })
    }
  };

  const updateCell = (cell, marker) => {
    gridCells[cell].textContent = marker;
  }

  return { setupDom, updateCell };
})()

const GameManager = (() => {
  let winner = '';
  let currentPlayerTurn = Players.playerX; // first player to take turn

  const playTurn = (cell) => {
      Gameboard.updateBoard(cell, currentPlayerTurn);
      HandleDOM.updateCell(cell, currentPlayerTurn);

      // check if winner
      const winner = Gameboard.checkForWinner(currentPlayerTurn);
      if (winner) {
        alert(`Player ${currentPlayerTurn} wins!`);
      }

      // update currentPlayerTurn to next player
      currentPlayerTurn = currentPlayerTurn === Players.playerX ? Players.playerO : Players.playerX;
  }

  const getCurrentPlayerTurn = () => currentPlayerTurn;

  // const start = () => {
  //   // loop until some checks are valid (matching 3 or tie)
  //   do {
  //     // ? We will just assume this input is valid because later down the line we will be manipulating the DOM
  //     let input = parseInt(prompt(`Player ${_currentPlayerTurn} turn: `));
  //     // update gameboard
  //     Gameboard.updateBoard(input, _currentPlayerTurn);
  //     // check for winner
  //     const isWinner = Gameboard.checkForWinner(_currentPlayerTurn);
  //     if (isWinner) {
  //       winner = _currentPlayerTurn;
  //       alert(`Player ${winner} won the game!`);
  //       console.log(Gameboard.getGameboard());
  //       break;
  //     }
  //     // update _currentPlayerTurn
  //     _currentPlayerTurn = _currentPlayerTurn == Players.playerX ? Players.playerO : Players.playerX;
  //     console.log(`Next player is ${_currentPlayerTurn}`);
  //   } while (winner === '');
  // };
  
  const reset = () => {
    winner = '';
    _currentPlayerTurn = Players.playerX;
    Gameboard.resetBoard();
  }

  return { playTurn, getCurrentPlayerTurn ,reset };
})();

// GameManager.start(); // Will keep running until there is a winner
// GameManager.reset(); // Reset the game
HandleDOM.setupDom();