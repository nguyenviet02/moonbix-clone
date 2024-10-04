import TokenImage from 'images/token.png';
import TelegramImage from 'images/telegram.png';
import BinanceImage from 'images/binance.png';
import CheckIcon from 'images/check.png';
import ArrowRightIcon from 'icons/arrow-right.svg';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';

const TasksPage = () => {
  const taskNormal = [
    {
      name: 'Daily check-in',
      points: 100,
      platform: 'Telegram',
      isFinished: true,
    },
    {
      name: 'Share the campaign to your TG story',
      points: 100,
      platform: 'Telegram',
      isFinished: false,
    },
    {
      name: 'Subscribe Binance Announcement TG Channel',
      points: 500,
      platform: 'Telegram',
      isFinished: true,
    },
    {
      name: 'Subscribe to TG Game channel',
      points: 300,
      platform: 'Binance',
      isFinished: true,
    },
    {
      name: 'Subscribe Binance Announcement TG Channel',
      points: 100,
      platform: 'Telegram',
      isFinished: true,
    },
  ];
  const advanceTask = [
    {
      name: 'Bind your Binance account',
      points: 10000,
      platform: 'Binance',
      isFinished: false,
    },
  ];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full h-full flex flex-col px-[15px] pt-6">
      <div className="w-full flex justify-center items-center flex-col">
        <div className="w-full flex justify-center items-center">
          <img src={TokenImage} alt="image" className="w-5 h-5 object-contain" />
          <p className="text-[14px] text-color-textWhite leading-5 ml-2">Available points</p>
        </div>
        <p className="text-color-PrimaryText text-[40px] font-semibold leading-[48px] mt-1">16,666</p>
        <p className="w-[300px] text-center text-color-PrimaryText text-[14px] font-medium leading-[22px] mt-1">The more points you earn, the higher your chance of receiving crypto rewards!</p>
      </div>
      <Loading isLoading={isLoading}>
        <div className="w-full flex-1 min-h-0 overflow-y-auto hideScroll mt-6">
          <div className="w-full flex flex-col mt-4 gap-2">
            {taskNormal.map((task, index) => (
              <div key={index} className={`w-full flex items-center gap-4 py-3 px-4 rounded-xl bg-[#ffffff1a] ${task?.isFinished && 'opacity-40'}`}>
                <div className="w-full flex-1">
                  <p className="text-color-PrimaryText text-[14px] font-medium leading-[22px] mb-1">{task?.name}</p>
                  <div className="flex items-center">
                    <img src={TokenImage} alt="image" className="w-5 h-5 object-contain" />
                    <p className="text-color-textThird text-[12px] leading-5 ml-2 ">+{task?.points}</p>
                  </div>
                </div>
                <div className="w-[30px] h-[30px] shrink-0">
                  {task?.platform === 'Telegram' ? (
                    <img src={TelegramImage} alt="image" className="w-full h-full object-contain" />
                  ) : (
                    <img src={BinanceImage} alt="image" className="w-full h-full object-contain" />
                  )}
                </div>
                {task?.isFinished ? <img src={CheckIcon} alt="image" className="w-5 h-5 object-contain" /> : <img src={ArrowRightIcon} alt="image" className="w-5 h-5 object-contain filter-white" />}
              </div>
            ))}
          </div>
          <p className="text-color-textWhite text-base mb-2	">Advanced</p>
          <div className="w-full flex flex-col gap-2">
            {advanceTask.map((task, index) => (
              <div key={index} className={`w-full flex items-center gap-4 py-3 px-4 rounded-xl bg-[#ffffff1a] ${task?.isFinished && 'opacity-40'}`}>
                <div className="w-full flex-1">
                  <p className="text-color-PrimaryText text-[14px] font-medium leading-[22px] mb-1">{task?.name}</p>
                  <div className="flex items-center">
                    <img src={TokenImage} alt="image" className="w-5 h-5 object-contain" />
                    <p className="text-color-textThird text-[12px] leading-5 ml-2 ">+{task?.points}</p>
                  </div>
                </div>
                <div className="w-[30px] h-[30px] shrink-0">
                  {task?.platform === 'Telegram' ? (
                    <img src={TelegramImage} alt="image" className="w-full h-full object-contain" />
                  ) : (
                    <img src={BinanceImage} alt="image" className="w-full h-full object-contain" />
                  )}
                </div>
                {task?.isFinished ? <img src={CheckIcon} alt="image" className="w-5 h-5 object-contain" /> : <img src={ArrowRightIcon} alt="image" className="w-5 h-5 object-contain filter-white" />}
              </div>
            ))}
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default TasksPage;
