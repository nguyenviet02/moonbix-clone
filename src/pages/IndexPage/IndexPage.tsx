import MainMenu from '@/components/MainMenu/MainMenu';
import backgroundImage from 'images/background.png';
import type { FC } from 'react';

import { Outlet, useLocation } from 'react-router-dom';
export const IndexPage: FC = () => {
  const location = useLocation();
  return (
    <main className={`relative w-screen h-screen max-h-screen max-w-[767px] flex flex-col justify-between items-center ${location?.pathname !== '/' && 'bg-black'}`}>
      {location?.pathname === '/' && <img src={backgroundImage} alt="bg" className="w-full h-full object-cover z-[-1] absolute object-top" />}
      <section className="w-full h-full max-h-full overflow-y-auto flex-1 min-h-0 hideScroll bg-transparent">
        <Outlet />
      </section>
      <div className="w-full min-h-fit h-[90px] max-h-[90px] shrink-0 flex justify-center items-end px-[15px] pb-5">
        <MainMenu />
      </div>
    </main>
  );
};
