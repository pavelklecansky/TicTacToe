const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  const setMark = (coordinets, board) => board.setMark(coordinets, symbol);

  return { getName, getSymbol, setMark };
};

const gameBoard = (() => {
  //Default values
  const board = [
    ["0,0", "0,1", "0,2"],
    ["1,0", "1,1", "1,2"],
    ["2,0", "2,1", "2,2"],
  ];

  const getBoard = () => board.map((inner) => inner.splice);

  const validCoordinets = (coordinets) => {
    if (!coordinets.hasOwnProperty("x") || !coordinets.hasOwnProperty("y")) {
      return false;
    }
    const x = coordinets.x;
    const y = coordinets.y;
    if (isNaN(x) || isNaN(y) || !(x >= 0 && x <= 2) || !(y >= 0 && y <= 2)) {
      return false;
    }

    return true;
  };

  const validSymbol = (symbol) => symbol === "X" || symbol === "O";

  const taken = (coordinets) => {
    const x = coordinets.x;
    const y = coordinets.y;
    const mark = board[x][y];
    return mark === "X" || mark === "O";
  };

  const setMark = (coordinets, symbol) => {
    if (!validCoordinets(coordinets) || !validSymbol(symbol) || taken(coordinets)) {
      console.log("Bad input");
      return;
    }

    const x = coordinets.x;
    const y = coordinets.y;

    board[x][y] = symbol;
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
playerX.setMark({ x: 1, y: 1 }, gameBoard);
gameBoard.printBoard();
playerX.setMark({ x: 1, y: 1 }, gameBoard);
