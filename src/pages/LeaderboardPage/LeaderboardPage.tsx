import TokenImage from 'images/token.png';
import CopyIcon from 'icons/copy.svg';

const LeaderboardPage = () => {
  const listPlayers = [
    {
      id: 1,
      ranking: 1,
      name: 'John Doe',
      points: 99999,
    },
    {
      id: 2,
      ranking: 2,
      name: 'Jane Doe',
      points: 99998,
    },
    {
      id: 3,
      ranking: 3,
      name: 'John Doe',
      points: 99997,
    },
    {
      id: 4,
      ranking: 4,
      name: 'Jane Doe',
      points: 99996,
    },
    {
      id: 5,
      ranking: 5,
      name: 'John Doe',
      points: 99995,
    },
    {
      id: 6,
      ranking: 6,
      name: 'Jane Doe',
      points: 99994,
    },
    {
      id: 7,
      ranking: 7,
      name: 'John Doe',
      points: 99993,
    },
    {
      id: 8,
      ranking: 8,
      name: 'Jane Doe',
      points: 99992,
    },
    {
      id: 9,
      ranking: 9,
      name: 'John Doe',
      points: 99991,
    },
    {
      id: 10,
      ranking: 10,
      name: 'Jane Doe',
      points: 99990,
    },
  ];
  return (
    <div className="px-[15px] py-6 pb-0 flex flex-col items-center h-full w-full">
      {/* Title */}
      <h1 className="text-[20px] leading-7 font-semibold text-color-textPrimary text-center">MOONBIX HALL OF FAME</h1>
      <p className="text-color-textPrimary text-center w-[270px] text-[14px] leading-[22px] mt-1">Hold the Hall of Fame top spot to earn special rewards in each game cycle!</p>

      {/* Leaderboard */}
      <div className="w-full flex justify-between items-center text-[12px] leading-[18px] text-color-textThird mt-10 mb-2 ">
        <p>17,539,464 Players</p>
        <p>Total points earned</p>
      </div>
      <div className="w-full leading-[22px] flex text-[14px] text-color-PrimaryText bg-[#785d06] p-2 mb-2 rounded-lg">
        <p className="w-10 text-center">100+</p>
        <p className="flex-1 w-full ml-[10px]">Me</p>
        <div className="w-fit shrink-0 flex items-center">
          <img src={TokenImage} alt="img" className="w-5 h-5 object-contain" />
          <p className="ml-1 w-fit shrink-0 text-[12px] leading-5">99,999</p>
        </div>
      </div>
      <div className="w-full flex-1 min-h-0 overflow-y-auto hideScroll">
        {listPlayers.map((player) => (
          <div key={player.id} className="w-full leading-[22px] flex text-[14px] text-color-textPrimary p-2 mb-2 rounded-lg">
            <p className="w-10 text-center shrink-0">{player.ranking}</p>
            <p className="flex-1 w-full ml-[10px]">{player.name}</p>
            <div className="w-fit shrink-0 flex items-center">
              <img src={TokenImage} alt="img" className="w-5 h-5 object-contain shrink-0" />
              <p className="ml-1 w-fit shrink-0 text-[12px] leading-5">{player.points}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-2 text-[#4f5867] flex justify-between items-center text-[12px] leading-[18px] font-medium">
        <p>Updated every 10 mins</p>
        <p>Last updated: 2024-10-03 09:04</p>
      </div>
      <div className="w-full flex justify-between gap-4">
        <button className="w-full flex-1 button-secondary bg-[#f8d33a] text-black">Invite Friends for Bonuses</button>
        <button className="shrink-0 w-12 h-12 button-secondary pb-0 bg-[#f8d33a]">
          <img src={CopyIcon} alt="copy" className=" w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
