const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  const setMark = (coordinets, board) => board.setMark(coordinets, symbol);

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
      console.log("Bad input");
      return;
    }

    const { x, y } = positionToCoordinets(position);

    if (symbol === "X") {
      xSymbolPositons.push(String(position));
    } else {
      oSymbolPositons.push(String(position));
    }

    board[x][y] = symbol;
    const win = checkForWin();
    console.log(win);
  };

  return { getBoard, setMark };
})();

const displayController = (() => {
  const printBoard = (board) => {
    console.log("Board:");
    board.map((inner) => {
      console.log(inner);
    });
  };

  return { printBoard };
})();

const playerX = Player("Pavel", "X");
const playerO = Player("Nepavel", "O");
playerX.setMark(6, gameBoard);
playerO.setMark(4, gameBoard);
playerO.setMark(5, gameBoard);
playerO.setMark(1, gameBoard);
playerX.setMark(2, gameBoard);
playerO.setMark(3, gameBoard);
playerX.setMark(7, gameBoard);
playerO.setMark(8, gameBoard);
playerX.setMark(9, gameBoard);

displayController.printBoard(gameBoard.getBoard());
