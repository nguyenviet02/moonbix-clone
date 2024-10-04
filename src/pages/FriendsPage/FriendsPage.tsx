import FriendImage from 'images/friends.png';
import TokenImage from 'images/token.png';
import CopyIcon from 'icons/copy.svg';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';

const FriendsPage = () => {
  const listFriends = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'John Doe',
    },
    {
      id: 4,
      name: 'Jane Doe',
    },
    {
      id: 5,
      name: 'John Doe',
    },
    {
      id: 6,
      name: 'Jane Doe',
    },
    {
      id: 7,
      name: 'John Doe',
    },
    {
      id: 8,
      name: 'Jane Doe',
    },
    {
      id: 9,
      name: 'John Doe',
    },
    {
      id: 10,
      name: 'Jane Doe',
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
    <div className="size-full px-[15px] pt-6 flex flex-col items-center">
      <h1 className="text-[20px] leading-7 font-semibold text-center text-color-PrimaryText flex justify-center items-center gap-1">
        Invite friends <img src={FriendImage} alt="image" className="w-5" />
        and get rewards
      </h1>
      <p className="w-[250px] text-center text-color-PrimaryText text-[14px] leading-[22px] font-medium">
        Your friends could help you earn up to <span className="font-semibold">50,000</span> points!
      </p>
      <div className="w-full flex items-center gap-[10px] mt-6">
        <div className="flex flex-col gap-2 flex-1 w-full bg-[#ffffff1a] rounded-2xl px-4 py-[18px]">
          <p className="text-color-textThird text-[12px] leading-[18px] font-medium">Friends invited</p>
          <div className="flex items-center">
            <img src={FriendImage} alt="image" className="w-5" />
            <p className="text-color-textWhite text-[20px] leading-[28px] ml-2 font-semibold">x 1</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1 w-full bg-[#ffffff1a] rounded-2xl px-4 py-[18px]">
          <p className="text-color-textThird text-[12px] leading-[18px] font-medium">Coins earned</p>
          <div className="flex items-center">
            <img src={TokenImage} alt="image" className="w-5" />
            <p className="text-color-textWhite text-[20px] leading-[28px] ml-2 font-semibold">x 524</p>
          </div>
        </div>
      </div>
      <ul className="w-full list-disc p-4 pl-8 text-[12px] leading-[18px] text-color-textThird">
        <li>
          <p>
            You could earn <span className="text-color-textWhite font-medium">10%</span> of all points earned by players you have invited, capped at{' '}
            <span className="text-color-textWhite font-medium">50,000</span> points.
          </p>
        </li>
        <li>
          <p>
            Invited friends will receive a gift of <span className="text-color-textWhite font-medium">1000</span> points.
          </p>
        </li>
      </ul>
      <div className="w-full flex items-center gap-1 text-[12px] text-color-textThird px-2 py-1">
        <p className="w-10 shrink-0 text-center">No.</p>
        <p className="w-full flex-1">Friend&apos;s name</p>
      </div>
      <Loading isLoading={isLoading}>
        <div className="w-full h-fit flex-1 min-h-0 overflow-y-auto hideScroll">
          {listFriends.map((friend) => (
            <div key={friend.id} className="w-full flex items-center gap-1 text-[14px] leading-[22px] text-color-textWhite p-2">
              <p className="w-10 shrink-0 text-center">{friend.id}</p>
              <p className="w-full flex-1">{friend.name}</p>
            </div>
          ))}
        </div>
      </Loading>
      <p className="w-full text-color-TertiaryText text-[12px] leading-[18px] mt-1 mb-2 font-medium">Displaying the most recent 300 records only</p>
      <div className="w-full flex justify-between gap-4">
        <button className="w-full flex-1 button-secondary bg-[#f8d33a] text-black">Invite Friends for Bonuses</button>
        <button className="shrink-0 w-12 h-12 button-secondary pb-0 bg-[#f8d33a]">
          <img src={CopyIcon} alt="copy" className=" w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FriendsPage;
