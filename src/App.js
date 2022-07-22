import { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import ScoreBoard from "./components/ScoreBoard";
import GameWin from "./components/GameWin";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blankSquare from "./images/blank.png";

/** Width variable dictates the width of the game board (in squares). */
const width = 8;
/** Array of all the possible colors for the candy pieces in each square. */
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

const App = () => {
  /** State that holds the color arrangement for the game board. */
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  /** State the holds the element of the currently selected (dragged) element. */
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  /** State that holds the element of the square that is being replaced by the dragged element. */
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  /** State that holds the current score of the game. */
  const [scoreDisplay, setScoreDisplay] = useState(0);

  /** Function will theck for a column of four of the same color. */
  const checkForColumnOfFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]; // This puts the column of 4 indexes to check into a single array.
      const decidedColor = currentColorArrangement[i]; // This is the variable that holds the current color we're checking against to see if the other 3 slots are of this color.
      const isBlank = currentColorArrangement[i] === blankSquare; // Simply checks if the square is a blank square.

      /** This if will look at the 4 slots in the column of four array and check to see if it exists in the color arrangement array, and if they are all the same color and none of them are blank. */
      if (
        columnOfFour.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor &&
            !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blankSquare)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  /** Function will check for a row of four of the same color. */
  const checkForRowOfFour = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]; // Array of 4 square indexes in a row instead of a column.
      const decidedColor = currentColorArrangement[i]; // Current color to check against.
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ]; // All of the index numbers that are not valid (or will not fit within 3 squares away from the 'selected' color / candy).
      const isBlank = currentColorArrangement[i] === blankSquare;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor &&
            !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blankSquare)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  /** Function will check for a column of three of the same color. */
  const checkForColumnOfThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]; // Array that holds indexes of three squares to check.
      const decidedColor = currentColorArrangement[i]; // Current color to check against.
      const isBlank = currentColorArrangement[i] === blankSquare;

      if (
        columnOfThree.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor &&
            !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blankSquare)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  /** Function will check for a row of three of the same color. */
  const checkForRowOfThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blankSquare;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (squareColorIndex) =>
            currentColorArrangement[squareColorIndex] === decidedColor &&
            !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blankSquare)
        );
        return true;
      }
    }
  }, [currentColorArrangement]);

  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
      const firstRowIndexes = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRowIndexes.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blankSquare) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blankSquare) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blankSquare;
      }
    }
  }, [currentColorArrangement]);

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const resetDragStates = useCallback(() => {
    setSquareBeingDragged(null);
    setSquareBeingReplaced(null);
  }, []);

  const dragEnd = useCallback(
    (squareBeingDragged, squareBeingReplaced) => {
      if (!squareBeingReplaced || !squareBeingDragged) return;
      const squareBeingReplacedId = parseInt(
        squareBeingReplaced.getAttribute("data-id")
      );
      const squareBeingDraggedId = parseInt(
        squareBeingDragged.getAttribute("data-id")
      );

      currentColorArrangement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");

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

      // debugger;
      if (
        squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
      ) {
        resetDragStates();
      } else {
        currentColorArrangement[squareBeingReplacedId] =
          squareBeingReplaced.getAttribute("src");
        currentColorArrangement[squareBeingDraggedId] =
          squareBeingDragged.getAttribute("src");
        setCurrentColorArrangement([...currentColorArrangement]);
      }
    },
    [
      checkForColumnOfFour,
      checkForColumnOfThree,
      checkForRowOfFour,
      checkForRowOfThree,
      currentColorArrangement,
      resetDragStates,
    ]
  );

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

  /** Will trigger to check for all columns / rows that match colors. */
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

  useEffect(() => {
    if (!squareBeingDragged || !squareBeingReplaced) return;
    dragEnd(squareBeingDragged, squareBeingReplaced);
  }, [dragEnd, squareBeingDragged, squareBeingReplaced]);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (
        ![0, 8, 16, 24, 32, 40, 48, 56].includes(
          eventData.event.target.dataset.id
        )
      ) {
        let leftElement = document.querySelector(
          `[data-id="${
            parseInt(eventData.event.target.getAttribute("data-id")) - 1
          }"]`
        );
        setSquareBeingDragged(eventData.event.target);
        setSquareBeingReplaced(leftElement);
      }
    },
    onSwipedUp: (eventData) => {
      if (
        ![0, 1, 2, 3, 4, 5, 6, 7].includes(eventData.event.target.dataset.id)
      ) {
        let topElement = document.querySelector(
          `[data-id="${
            parseInt(eventData.event.target.getAttribute("data-id")) - 8
          }"]`
        );
        setSquareBeingDragged(eventData.event.target);
        setSquareBeingReplaced(topElement);
      }
    },
    onSwipedRight: (eventData) => {
      if (
        ![7, 14, 21, 28, 35, 42, 49, 56].includes(
          eventData.event.target.dataset.id
        )
      ) {
        let rightElement = document.querySelector(
          `[data-id="${
            parseInt(eventData.event.target.getAttribute("data-id")) + 1
          }"]`
        );
        setSquareBeingDragged(eventData.event.target);
        setSquareBeingReplaced(rightElement);
      }
    },
    onSwipedDown: (eventData) => {
      if (
        ![56, 57, 58, 59, 60, 61, 62, 63].includes(
          eventData.event.target.dataset.id
        )
      ) {
        let downElement = document.querySelector(
          `[data-id="${
            parseInt(eventData.event.target.getAttribute("data-id")) + 8
          }"]`
        );
        setSquareBeingDragged(eventData.event.target);
        setSquareBeingReplaced(downElement);
      }
    },
    config: {
      preventScrollOnSwipe: true,
    },
  });

  return (
    <div className="app">
      <ScoreBoard score={scoreDisplay} />
      <div className="gameBackground">
        <div className="game" {...handlers}>
          {currentColorArrangement.map((candyColor, index) => (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={() => dragEnd(squareBeingDragged, squareBeingReplaced)}
            />
          ))}
        </div>
      </div>
      {scoreDisplay >= 150 && (
        <GameWin
          resetColors={setCurrentColorArrangement}
          resetScore={setScoreDisplay}
        />
      )}
    </div>
  );
};

/** Styles */

export default App;
