const GameWin = ({ resetColors, resetScore }) => {
  const restartGame = () => {
    resetColors([]);
    resetScore(0);
  };

  return (
    <div className="page-mask-on-win">
      <div className="win-window">
        <h1 className="you-win-text">You win!</h1>
        <button className="play-again-btn" onClick={() => restartGame()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameWin;
