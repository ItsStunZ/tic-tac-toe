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
  const playerX = {
    marker: 'X',
    score: 0
  };
  const playerO = {
    marker: 'O',
    score: 0
  };

  return { playerX, playerO };
})();

const HandleDOM = (() => {
  const gridCells = document.querySelectorAll('.grid__child');
  const winnerOverlayElement = document.querySelector('.winner-overlay');
  const winnerOverlayTitle = document.querySelector('.winner__title');
  const currentTurnHeader = document.querySelector('.current-turn-display');
  const scoreBoardElement = document.querySelector('.scoreboard-container');

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

  const updateCurrentTurnDisplay = (marker) => {
    currentTurnHeader.textContent = `Player ${marker} Turn!`;
  }

  const displayWinner = (text) => {
    winnerOverlayTitle.textContent = text;
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

  return { setupDom, updateCell, updateCurrentTurnDisplay, displayWinner, resetDOM };
})()

const GameManager = (() => {
  let winner = '';
  let currentPlayerTurn = Players.playerX; // first player to take turn
  HandleDOM.updateCurrentTurnDisplay(currentPlayerTurn);

  const playTurn = (cell) => {
      Gameboard.updateBoard(cell, currentPlayerTurn);
      HandleDOM.updateCell(cell, currentPlayerTurn);

      // check if winner
      const isWinner = Gameboard.checkForWinner(currentPlayerTurn);
      if (isWinner) {
        winner = currentPlayerTurn;
        HandleDOM.displayWinner(`Player ${currentPlayerTurn} Wins!`);
      }

      // update currentPlayerTurn to next player
      currentPlayerTurn = currentPlayerTurn === Players.playerX ? Players.playerO : Players.playerX;
      HandleDOM.updateCurrentTurnDisplay(currentPlayerTurn);

      // Check for a tie
      const gameBoard = Gameboard.getGameboard();

      let check = 0;
      gameBoard.forEach((cell) => {
        if (cell !== '') check++;
      })
      
      if (check >= 9) {
        // Tie
        HandleDOM.displayWinner(`No Winner. It's a Tie!`);
      }
  }

  const getCurrentPlayerTurn = () => currentPlayerTurn;

  const reset = () => {
    winner = '';
    currentPlayerTurn = Players.playerX;
    HandleDOM.updateCurrentTurnDisplay(currentPlayerTurn);
    Gameboard.resetBoard();
    HandleDOM.resetDOM();
  }

  return { playTurn, getCurrentPlayerTurn, reset };
})();

HandleDOM.setupDom();