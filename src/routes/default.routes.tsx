import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
const Home = lazy(() => import('../pages/Home'));

/*
  The object controls the pages routes when the user is not logged in
*/
const DefaultRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="*" exact>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default DefaultRoutes;
