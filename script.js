let isGameStarted = false;
let firstPlayer;
let secondPlayer;
let currentPlayer;

const toggleCurrentPlayer = () => {
  if (currentPlayer === firstPlayer) {
    currentPlayer = secondPlayer;
  } else {
    currentPlayer = firstPlayer;
  }
};

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  let player1Name = document.querySelector("#player1-input")?.value;
  let player2Name = document.querySelector("#player2-input")?.value;
  firstPlayer = Player(player1Name, "X");
  secondPlayer = Player(player2Name, "O");
  currentPlayer = firstPlayer;
  isGameStarted = true;
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

  const getBoard = () => board;

  const isBoardFull = () => xSymbolPositons.length + oSymbolPositons.length === 9;

  const checkForWin = () => {
    for (const winning of winningPosition) {
      let arrayOfWinning = winning.split("");
      let xWin = arrayOfWinning.every((el) => {
        return xSymbolPositons.indexOf(el) !== -1;
      });
      if (xWin) {
        return "X";
      }
      let oWin = arrayOfWinning.every((el) => {
        return oSymbolPositons.indexOf(el) !== -1;
      });
      if (oWin) {
        return "O";
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
    displayController.displayWinner(checkForWin());
    return true;
  };

  return { getBoard, setMark };
})();

const displayController = (() => {
  const grid = document.querySelector(".tic-tac-toe-grid");

  const displayWinner = (winSequence) => {
    if (winSequence) {
      switch (winSequence) {
        case "X":
          alert("Winner is X");
          break;
        case "O":
          alert("Winner is O");
          break;
        default:
          alert("It a tie");
          break;
      }
    }
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
