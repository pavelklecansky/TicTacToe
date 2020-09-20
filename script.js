let isGameStarted = false;
let firstPlayer;
let secondPlayer;
let currentPlayer;
let winner;

let player1Input = document.querySelector("#player1-input");
let player2Input = document.querySelector("#player2-input");

const toggleCurrentPlayer = () => {
  if (currentPlayer === firstPlayer) {
    currentPlayer = secondPlayer;
  } else {
    currentPlayer = firstPlayer;
  }
};

const restartGame = () => {
  startButton.textContent = "Start";
  gameBoard.restartTheBoard();
  firstPlayer = null;
  secondPlayer = null;
  currentPlayer = null;
  winner = null;
  displayController.displayBoardPage(gameBoard.getBoard());
  isGameStarted = false;
  player1Input.value = "";
  player2Input.value = "";
};

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  if (player1Input.value.length !== 0 && player2Input.value.length !== 0) {
    if (isGameStarted) {
      restartGame();
    } else {
      let player1Name = player1Input?.value;
      let player2Name = player2Input?.value;
      firstPlayer = Player(player1Name, "X");
      secondPlayer = Player(player2Name, "O");
      currentPlayer = firstPlayer;
      isGameStarted = true;
      startButton.textContent = "Restart";
    }
  } else {
    alert("empty");
  }
});

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  const setMark = (position, board) => board.setMark(position, symbol);

  return { getName, getSymbol, setMark };
};
const gameBoard = (() => {
  //Default values
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let xSymbolPositons = [];
  let oSymbolPositons = [];

  const winningPosition = ["123", "456", "789", "147", "258", "369", "159", "357"];

  const restartTheBoard = () => {
    board.forEach((inner) => {
      inner.fill("");
      xSymbolPositons = [];
      oSymbolPositons = [];
    });
  };

  const getBoard = () => board;

  const isBoardFull = () => xSymbolPositons.length + oSymbolPositons.length === 9;

  const checkForWin = () => {
    for (const winning of winningPosition) {
      let arrayOfWinning = winning.split("");
      let xWin = arrayOfWinning.every((el) => {
        return xSymbolPositons.indexOf(el) !== -1;
      });
      if (xWin) {
        winner = currentPlayer;
        displayController.displayWinner(winner);
      }
      let oWin = arrayOfWinning.every((el) => {
        return oSymbolPositons.indexOf(el) !== -1;
      });
      if (oWin) {
        winner = currentPlayer;
        displayController.displayWinner(winner);
      }
    }

    if (isBoardFull()) {
      return "Tie";
    }
  };

  const validPosition = (position) => {
    if (isNaN(position) || !(position >= 1 && position <= 9)) {
      return false;
    }

    return true;
  };

  const validSymbol = (symbol) => symbol === "X" || symbol === "O";

  const taken = (position) => {
    const { x, y } = positionToCoordinets(position);
    const mark = board[x][y];
    return mark === "X" || mark === "O";
  };

  const positionToCoordinets = (position) => {
    switch (position) {
      case 1:
        return { x: 0, y: 0 };
      case 2:
        return { x: 0, y: 1 };
      case 3:
        return { x: 0, y: 2 };
      case 4:
        return { x: 1, y: 0 };
      case 5:
        return { x: 1, y: 1 };
      case 6:
        return { x: 1, y: 2 };
      case 7:
        return { x: 2, y: 0 };
      case 8:
        return { x: 2, y: 1 };
      case 9:
        return { x: 2, y: 2 };
    }
  };

  /**
   *
   * @param position = position in grid | 1 2 3 |
   *                                    | 4 5 6 |
   *                                    | 7 8 9 |
   *
   */
  const setMark = (position, symbol) => {
    if (!validPosition(position) || !validSymbol(symbol) || taken(position)) {
      return false;
    }

    const { x, y } = positionToCoordinets(position);

    if (symbol === "X") {
      xSymbolPositons.push(String(position));
    } else {
      oSymbolPositons.push(String(position));
    }

    board[x][y] = symbol;
    checkForWin();
    return true;
  };

  return { getBoard, setMark, restartTheBoard };
})();

const displayController = (() => {
  const grid = document.querySelector(".tic-tac-toe-grid");

  const displayWinner = (winner) => {
    const modal = document.querySelector("#modal");
    const modalOverlay = document.querySelector("#modal-overlay");
    const restartButton = document.querySelector("#restart-button");
    const winnerText = document.querySelector("#winner-text");
    winnerText.textContent = winnerText.textContent + winner.getName();
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    restartButton.addEventListener("click", function () {
      modal.classList.add("closed");
      modalOverlay.classList.add("closed");
      restartGame();
    });
  };

  const printBoard = (board) => {
    console.log("Board:");
    board.map((inner) => {
      console.log(inner);
    });
  };

  const createDiv = (innerText, position) => {
    const div = document.createElement("div");
    div.innerText = innerText;
    div.addEventListener("click", () => {
      if (isGameStarted) {
        if (currentPlayer.setMark(position, gameBoard)) {
          div.innerHTML = currentPlayer.getSymbol() + position;
          toggleCurrentPlayer();
        }
      }
    });
    return div;
  };

  const displayBoardPage = (board) => {
    grid.innerHTML = "";
    let position = 0;
    for (let i = 0; i < board.length; i++) {
      let inner = board[i];
      for (let j = 0; j < inner.length; j++) {
        position++;
        grid.appendChild(createDiv(inner[j], position));
      }
    }
  };

  return { printBoard, displayBoardPage, displayWinner };
})();

displayController.displayBoardPage(gameBoard.getBoard());
