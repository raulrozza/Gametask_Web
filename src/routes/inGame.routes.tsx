import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import { Loading } from 'components';

// Hooks
import { useGameData } from 'hooks';

// Pages
const Activities = lazy(() => import('pages/Activities'));
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
          <Route path="/activities" exact component={Activities} />
          <Route path="/game" component={Game} />
          <Route path="/players" component={Players} />
        </>
      )}
    </Switch>
  );
};

export default InGameRoutes;
