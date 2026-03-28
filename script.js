const Gameboard = (() => {
  let gameBoard = ['', '', '',
                   '', '', '',
                   '', '', ''];

  const updateBoard = (pos, marker) => {
    gameBoard[pos] = marker;
  }

  const isPosAvailable = (pos) => gameBoard[pos] === '';
  
  const checkForWinner = (marker) => {
    // Horizontally
    if (gameBoard[0] === marker && gameBoard[1] === marker && gameBoard[2] === marker ||
        gameBoard[3] === marker && gameBoard[4] === marker && gameBoard[5] === marker ||
        gameBoard[6] === marker && gameBoard[7]=== marker && gameBoard[8] === marker)
        return true;

    // Vertically
    if (gameBoard[0] === marker && gameBoard[3] === marker && gameBoard[6] === marker ||
        gameBoard[1] === marker && gameBoard[4] === marker && gameBoard[7] === marker ||
        gameBoard[2] === marker && gameBoard[5]=== marker && gameBoard[8] === marker)
        return true;

    // Diagonol
    if (gameBoard[0] === marker && gameBoard[4] === marker && gameBoard[8] === marker ||
        gameBoard[2] === marker && gameBoard[4] === marker && gameBoard[6] === marker)
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
  const player1 = {
    username: 'Player X',
    marker: 'X',
    score: 0
  };
  const player2 = {
    username: 'Player O',
    marker: 'O',
    score: 0
  };

  return { player1, player2 };
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

  const updateScoreboard = () => {
    const player1Element = document.querySelector('#scoreboard__playerX');
    const player2Element = document.querySelector('#scoreboard__playerO');
    player1Element.textContent = `${Players.player1.username}: ${Players.player1.score}`;
    player2Element.textContent = `${Players.player2.username}: ${Players.player2.score}`;
  }

  const updateCurrentTurnDisplay = (username) => {
    currentTurnHeader.textContent = `${username} Turn!`;
  }

  const displayResultOverlay = (text) => {
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

  return { setupDom, updateCell, updateScoreboard, updateCurrentTurnDisplay, displayResultOverlay, resetDOM };
})()

const GameManager = (() => {
  let winner = '';
  let currentPlayerTurn = Players.player1; // first player to take turn
  HandleDOM.updateCurrentTurnDisplay(currentPlayerTurn.username);

  const playTurn = (cell) => {
      Gameboard.updateBoard(cell, currentPlayerTurn.marker);
      HandleDOM.updateCell(cell, currentPlayerTurn.marker);

      // check if winner
      const isWinner = Gameboard.checkForWinner(currentPlayerTurn.marker);
      if (isWinner) {
        winner = currentPlayerTurn.username;
        currentPlayerTurn.score++;
        HandleDOM.updateScoreboard();
        HandleDOM.displayResultOverlay(`${winner} Wins!`);
      }

      // update currentPlayerTurn to next player
      currentPlayerTurn = currentPlayerTurn === Players.player1 ? Players.player2 : Players.player1;
      HandleDOM.updateCurrentTurnDisplay(currentPlayerTurn.username);

      // Check for a tie
      const gameBoard = Gameboard.getGameboard();

      let check = 0;
      gameBoard.forEach((cell) => {
        if (cell !== '') check++;
      })
      
      if (check >= 9) {
        // Tie
        HandleDOM.displayResultOverlay(`No Winner. It's a Tie!`);
      }
  }

  const getCurrentPlayerTurn = () => currentPlayerTurn;

  const reset = () => {
    winner = '';
    currentPlayerTurn = Players.player1;
    HandleDOM.updateCurrentTurnDisplay(currentPlayerTurn.username);
    Gameboard.resetBoard();
    HandleDOM.resetDOM();
  }

  return { playTurn, getCurrentPlayerTurn, reset };
})();

HandleDOM.setupDom();