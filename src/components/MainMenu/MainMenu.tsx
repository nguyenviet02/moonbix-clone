import { useLocation } from 'react-router-dom';

import { Link } from 'components/Link/Link';
import GameIcon from 'icons/game.svg';
import LeaderboardIcon from 'icons/leaderboard.svg';
import TasksIcon from 'icons/tasks.svg';
import FriendsIcon from 'icons/friends.svg';
import BinanceIcon from 'icons/binance.svg';
const MainMenu = () => {
  const location = useLocation();
  const menuItem = [
    {
      name: 'Game',
      icon: GameIcon,
      link: '/game',
    },
    {
      name: 'Leaderboard',
      icon: LeaderboardIcon,
      link: '/leaderboard',
    },
    {
      name: 'Tasks',
      icon: TasksIcon,
      link: '/tasks',
    },
    {
      name: 'Friends',
      icon: FriendsIcon,
      link: '/friends',
    },
    {
      name: 'Binance',
      icon: BinanceIcon,
      link: '/binance',
    },
  ];
  return (
    <div className="w-full flex items-center h-[58px] bg-[#ffffff1a] py-2 px-[10px] rounded-[50px]">
      {menuItem?.map((item, index) => (
        <Link key={index} to={item?.link} className="w-full flex flex-col justify-center items-center">
          <img src={item?.icon} alt={item?.name} className={`w-6 h-6 ${location?.pathname === item?.link ? 'filter-white' : ' filter-gray'}`} />
          <p className={`text-[10px] font-medium leading-4 mt-[2px] ${location?.pathname === item?.link ? 'text-color-textWhite' : 'text-[#848e9c]'}`}>{item?.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;
