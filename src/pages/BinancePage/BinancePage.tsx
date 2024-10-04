import BinanceGift from 'images/binance-gift.png';
import ArrowRightIcon from 'icons/arrow-right.svg';

const BinancePage = () => {
  const listActions = [
    {
      id: 1,
      name: 'Install Binance app',
      link: '/',
    },
    {
      id: 2,
      name: 'Bind your Binance account / Sign up',
      link: '/',
    },
    {
      id: 3,
      name: 'Pass identify verification on Binance',
      link: '/',
    },
  ];
  return (
    <div className="size-full px-[15px] pt-6 flex flex-col items-center">
      <img src={BinanceGift} alt="image" className="w-[70px]" />
      <p className="text-color-PrimaryText text-[20px] leading-7 mt-2 font-semibold">Join Binance</p>
      <p className="text-color-PrimaryText text-[20px] leading-7 font-semibold">The world’s largest exchange</p>
      <p className="text-color-textThird text-[14px] leading-[22px] mt-1 text-center">Join over 200 million users on Binance and experience the world&apos;s largest crypto exchange! Sign up now!</p>
      <div className="w-full flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto hideScroll mt-4">
        {listActions.map((item) => (
          <button key={item?.id} className="w-full flex justify-between items-center px-4 py-6 bg-[#ffffff1a] rounded-xl">
            <p className="text-[14px] leading-[22px] text-white">{item?.name}</p>
            <img src={ArrowRightIcon} alt="icon" className="size-6 filter-white" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BinancePage;
