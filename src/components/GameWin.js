import { useEffect } from "react";
import ConfettiGenerator from "confetti-js";

const GameWin = ({ resetColors, resetScore }) => {
  const restartGame = () => {
    resetColors([]);
    resetScore(0);
  };

  useEffect(() => {
    const confettiSettings = { target: "confetti-canvas" };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []);

  return (
    <div className="page-mask-on-win">
      <div className="win-window">
        <h1 className="you-win-text">You win!</h1>
        <button className="play-again-btn" onClick={() => restartGame()}>
          Play Again
        </button>
      </div>
      <canvas id="confetti-canvas"></canvas>
    </div>
  );
};

export default GameWin;
