import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from 'images/background.png';
import IconArrowLeft from 'icons/arrow-left.svg';
import FireWorkGif from 'images/firework.gif';
import TokenImage from 'images/token.png';
import CopyIcon from 'icons/copy.svg';

const GameOver = () => {
  const location = useLocation();
  const { totalScore, level } = location.state;
  console.log('☠️ ~ GameOver ~ location:', location);
  const navigate = useNavigate();
  const playAgain = () => {
    const nextLevel = Number(level) + 1;
    navigate(`/play-game/${nextLevel}`, { replace: true });
  };
  return (
    <div className="w-screen h-screen relative max-w-[767px]">
      <img src={backgroundImage} alt="bg" className="w-full h-full object-cover -z-[1] absolute object-top" />
      <div className="w-full h-full p-4 pb-10 flex flex-col">
        <div className="relative w-full h-full flex flex-col items-center justify-center flex-1">
          <button onClick={() => navigate('/', { replace: true })} className="w-6 h-6 absolute top-0 left-0 z-20">
            <img src={IconArrowLeft} alt="icon" className="w-full h-full object-cover filter-white" />
          </button>
          <img src={FireWorkGif} alt="gif" className="absolute w-full h-full z-10" />
          <h1 className="text-color-textWhite text-5xl font-semibold">{totalScore}</h1>
          <div className="flex justify-center items-center gap-1">
            <img src={TokenImage} alt="token" className="w-5 h-5" />
            <p className="h-[30px] text-color-textWhite text-[18px] leading-[26px] font-semibold">points earned</p>
          </div>
        </div>
        <div className="w-full">
          <button onClick={playAgain} className="button-primary w-full mt-10">
            Play Again (🚀 Left x4)
          </button>
          <div className="w-full flex justify-between mt-4 gap-4">
            <button className="w-full flex-1 button-secondary">Share with Friends</button>
            <button className="shrink-0 w-12 h-12 button-secondary pb-0">
              <img src={CopyIcon} alt="copy" className="filter-yellow w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
