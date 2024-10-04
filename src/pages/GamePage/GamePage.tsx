import BinanceLogo from 'icons/binance-logo.svg';
import BinanceText from 'icons/binance-text.svg';
import CopyIcon from 'icons/copy.svg';
import TokenImage from 'images/token.png';
import RocketImage from 'images/rocket.png';
import { Link } from '@/components/Link/Link';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';

const GamePage = () => {
  const navigate = useNavigate();
  const playGame = (level: number) => {
    navigate(`/play-game/${level}`);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Loading isLoading={isLoading}>
      <section className="w-full h-full min-h-fit px-[15px]">
        <header className="relative flex flex-col justify-center items-center pt-[15px]">
          <img src={BinanceLogo} alt="Binance Logo" className="w-[45px] h-[45px] filter-yellow" />
          <img src={BinanceText} alt="Binance Text" className="w-[268px] h-[48px]" />
          <button className="bg-[#ffffff26] px-3 py-[9px] rounded-[30px] flex justify-center items-center text-white leading-5 absolute top-3 right-0">My Records</button>
        </header>
        <div className="min-h-[220px] w-full flex flex-col items-center mt-10 pt-[42px] px-[22px] pb-[20px] bg-blur">
          <div className="flex justify-center items-center">
            <img src={TokenImage} alt="Token" className="w-5 h-5 object-contain" />
            <p className="text-color-textPrimary leading-[22px] ml-2">Available points</p>
          </div>
          <p className="text-[48px] font-bold leading-[56px] mt-4 text-white">15,774</p>
          <div className="flex items-center justify-center gap-2 text-[14px] leading-[22px] mt-4">
            <img src={RocketImage} alt="Token" className="w-5 h-[22px] object-contain" />
            <p className="text-color-textThird leading-[22px] ">Your Attempts</p>
            <p className="text-color-PrimaryText">6/6</p>
          </div>
        </div>
        <div className="w-full">
          <button onClick={() => playGame(1)} className="button-primary w-full mt-10">
            Play Game
          </button>
          <div className="w-full flex justify-between mt-4 gap-4">
            <button className="w-full flex-1 button-secondary">Invite Friends for Bonuses</button>
            <button className="shrink-0 w-12 h-12 button-secondary pb-0">
              <img src={CopyIcon} alt="copy" className="filter-yellow w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center items-center">
          <Link to="/game" className="text-color-textThird text-[12px] font-semibold leading-[22px] underline">
            Terms and Conditions
          </Link>
        </div>
      </section>
    </Loading>
  );
};

export default GamePage;
