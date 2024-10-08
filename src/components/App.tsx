import { useIntegration } from '@telegram-apps/react-router-integration';
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, initNavigator, useLaunchParams, useMiniApp, useThemeParams, useViewport } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect, useMemo } from 'react';
import { Route, Router, Routes } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import GamePage from '@/pages/GamePage/GamePage';
import GameCanvas from '@/pages/GameCanvas/GameCanvas';
import GameOver from '@/pages/GameOver/GameOver';
import RecordsPage from '@/pages/RecordsPage/RecordsPage';

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <AppRoot appearance={miniApp.isDark ? 'dark' : 'light'} platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route path="/" element={<IndexPage />}>
            <Route index element={<GamePage />} />
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Route>
          <Route path="/play-game">
            <Route index path=":level" element={<GameCanvas />} />
          </Route>
          <Route path="/game-over" element={<GameOver />}></Route>
          <Route path="/my-records" element={<RecordsPage />}></Route>
        </Routes>
      </Router>
    </AppRoot>
  );
};
