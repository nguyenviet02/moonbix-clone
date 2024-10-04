import Loading from '@/components/Loading/Loading';
import ArrowLeftIcon from 'icons/arrow-left.svg';
import TokenImage from 'images/token.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecordsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const records = [
    {
      coin: 100,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 200,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 300,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 400,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 500,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 600,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 700,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 800,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 900,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1000,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1100,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1200,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1300,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1400,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1500,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1600,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1700,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1800,
      date: '04 Oct 2024 01:52',
    },
    {
      coin: 1900,
      date: '04 Oct 2024 01:52',
    },
  ];
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full h-screen max-h-screen flex flex-col bg-black p-6">
      <div className="relative w-full flex justify-center items-center">
        <button onClick={goBack} className="absolute top-0 left-0">
          <img src={ArrowLeftIcon} alt="icon" className="size-6 filter-white" />
        </button>
        <p className="text-color-PrimaryText text-[20px] leading-7 font-semibold">My Records</p>
      </div>
      <Loading isLoading={isLoading}>
        <div className="w-full flex-1 mt-6 min-h-0 overflow-y-auto hideScroll">
          {records?.map((record, index) => (
            <div key={index} className="w-full flex justify-between items-center py-4 border-b border-[#707a8a]">
              <div className="flex flex-col gap-1">
                <p className="text-color-textThird text-[12px] leading-[18px]">Coins earned</p>
                <div className="flex gap-1 items-center">
                  <img src={TokenImage} alt="image" className="size-5" />
                  <p className="text-color-textWhite text-base">x {record?.coin}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-color-textThird text-[12px] leading-[18px]">
                <p>Date (UTC+0)</p>
                <p>{record?.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Loading>
      <p className="mt-1 text-color-textThird text-[12px] leading-[18px]">Displaying the most recent 300 records only</p>
    </div>
  );
};

export default RecordsPage;
