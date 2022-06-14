import { useState, useEffect } from "react";

/** Width variable dictates the width of the game board (in squares). */
const width = 8;
/** Array of all the possible colors for the candy pieces in eaach square. */
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  /** State that holds the color arrangement for the game board. */
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  /** State the holds the element of the currently selected (dragged) element. */
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  /** State that holds the element of the square that is being replaced by the dragged element. */
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  /** Function will theck for a column of four of the same color. */
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfFour.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor
        )
      ) {
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = "")
        );
        return true;
      }
    }
  };

  /** Function will check for a row of four of the same color. */
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor
        )
      ) {
        rowOfFour.forEach((square) => (currentColorArrangement[square] = ""));
        return true;
      }
    }
  };

  /** Function will check for a column of three of the same color. */
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfThree.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = "")
        );
        return true;
      }
    }
  };

  /** Function will check for a row of three of the same color. */
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor
        )
      ) {
        rowOfThree.forEach((square) => (currentColorArrangement[square] = ""));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRowIndexes = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRowIndexes.includes(i);

      if (isFirstRow && currentColorArrangement[i] === "") {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === "") {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = "";
      }
    }
  };

  const dragStart = (e) => {
    console.log("Drag Start");
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log("Drag Drop");
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    console.log("Drag End");
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.style.backgroundColor;
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.style.backgroundColor;

    console.log("squareBeingDraggedId: ", squareBeingDraggedId);
    console.log("squareBeingReplacedId: ", squareBeingReplacedId);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.style.backgroundColor;
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.style.backgroundColor;
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  /** Function which creates the game board by creating 64 (8x8) colors within an array. */
  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  /** Creates the game board once at the start of the render. */
  useEffect(() => {
    createBoard();
  }, []);

  /** Will trigger to check for a column of three that match colors. */
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
