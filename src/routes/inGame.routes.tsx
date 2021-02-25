import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { Loading } from 'components';

// Hooks
import { useGameData } from 'hooks';

// Pages
const Achievements = lazy(() => import('pages/Achievements'));
const Activities = lazy(() => import('pages/Activities'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Game = lazy(() => import('pages/Game'));
const Players = lazy(() => import('pages/Players'));

/*
  The object controls the in game routes
*/
const InGameRoutes: React.FC = () => {
  const { game, loading } = useGameData();

  if (loading) return <Loading />;

  return (
    <Switch>
      {!game ? null : (
        <>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/achievements" exact component={Achievements} />
          <Route path="/activities" exact component={Activities} />
          <Route path="/game" component={Game} />
          <Route path="/players" component={Players} />
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/lobby" exact>
            <Redirect to="/dashboard" />
          </Route>
        </>
      )}
    </Switch>
  );
};

export default InGameRoutes;
