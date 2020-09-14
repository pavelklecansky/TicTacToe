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

  const winningPosition = ["123", "456", "789", "147", "258", "369", "159", "357"];

  const getBoard = () => board.map((inner) => inner.splice);

  const checkForWin = () => {};

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

    board[x][y] = symbol;
    //  checkForWin();
  };

  const printBoard = () => {
    console.log("Board:");
    board.map((inner) => {
      console.log(inner);
    });
  };

  return { getBoard, setMark, printBoard };
})();

const playerX = Player("Pavel", "X");
playerX.setMark(5, gameBoard);
gameBoard.printBoard();
playerX.setMark(5, gameBoard);
