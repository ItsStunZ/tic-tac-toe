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
  const winnerOverlayElement = document.querySelector('.winner-overlay');
  const winnerOverlayTitle = document.querySelector('.winner__title');

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

  const displayWinner = (marker) => {
    winnerOverlayTitle.textContent = `Player ${marker} Wins!`;
    winnerOverlayElement.style.display = 'flex';
  }

  const resetDOM = () => {
    // Reset winner overlay
    winnerOverlayElement.style.display = 'none';
    winnerOverlayTitle.textContent = '';

    // Reset cells
    gridCells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('valid');
      cell.classList.remove('invalid');
    })
  }

  return { setupDom, updateCell, displayWinner, resetDOM };
})()

const GameManager = (() => {
  let winner = '';
  let currentPlayerTurn = Players.playerX; // first player to take turn

  const playTurn = (cell) => {
      Gameboard.updateBoard(cell, currentPlayerTurn);
      HandleDOM.updateCell(cell, currentPlayerTurn);

      // check if winner
      const isWinner = Gameboard.checkForWinner(currentPlayerTurn);
      if (isWinner) {
        winner = currentPlayerTurn;
        HandleDOM.displayWinner(currentPlayerTurn);
      }

      // update currentPlayerTurn to next player
      currentPlayerTurn = currentPlayerTurn === Players.playerX ? Players.playerO : Players.playerX;
  }

  const getCurrentPlayerTurn = () => currentPlayerTurn;

  const reset = () => {
    winner = '';
    currentPlayerTurn = Players.playerX;
    Gameboard.resetBoard();
    HandleDOM.resetDOM();
  }

  return { playTurn, getCurrentPlayerTurn, reset };
})();

// GameManager.start(); // Will keep running until there is a winner
// GameManager.reset(); // Reset the game
HandleDOM.setupDom();