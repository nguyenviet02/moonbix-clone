import type { ComponentType, JSX } from 'react';

import GamePage from '@/pages/GamePage/GamePage';
import LeaderboardPage from '@/pages/LeaderboardPage/LeaderboardPage';
import TasksPage from '@/pages/TasksPage/TasksPage';
import FriendsPage from '@/pages/FriendsPage/FriendsPage';
import BinancePage from '@/pages/BinancePage/BinancePage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/game', Component: GamePage, title: 'Game Page' },
  { path: '/leaderboard', Component: LeaderboardPage, title: 'Leaderboard Page' },
  { path: '/tasks', Component: TasksPage, title: 'Tasks Page' },
  { path: '/friends', Component: FriendsPage, title: 'Friends Page' },
  { path: '/binance', Component: BinancePage, title: 'Binance Page' },
];
