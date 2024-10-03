import { useNavigate } from 'react-router-dom';

const GameOver = () => {
  const navigate = useNavigate();
  const playAgain = () => {
    navigate(`/play-game/${1}`, { replace: true });
  };
  return (
    <div>
      <h1>Game Over</h1>
      <p>Total Score: {0}</p>
      <p>Level: {1}</p>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
};

export default GameOver;
