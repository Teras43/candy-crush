const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <h1 className="candy-crush-title">Candy Crush!</h1>
      <h2>Score: {score}</h2>
      <h2 className="goal-tile">Goal: 150</h2>
    </div>
  );
};

export default ScoreBoard;
