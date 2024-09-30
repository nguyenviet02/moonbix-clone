import MainMenu from '@/components/MainMenu/MainMenu';
import type { FC } from 'react';

import { Outlet } from 'react-router-dom';
export const IndexPage: FC = () => {
  return (
    <main className="w-screen h-screen max-h-screen max-w-[767px] flex flex-col justify-between items-center bg-[url('images/background.png')] bg-top bg-repeat-y bg-black bg-cover">
      <section className="w-full h-full max-h-full overflow-y-auto flex-1 min-h-0 hideScroll bg-transparent">
        <Outlet />
      </section>
      <div className="w-full min-h-fit h-[90px] max-h-[90px] shrink-0 flex justify-center items-end px-[15px] pb-5">
        <MainMenu />
      </div>
    </main>
  );
};
