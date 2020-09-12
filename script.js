const Player = (name) => {

  const getName = () => name;

  return { getName };
};

const gameBoard = (() => {
  const board = [[], [], []];

  const getBoard = () => board.map((inner) => inner.splice);

  return { getBoard };
})();
