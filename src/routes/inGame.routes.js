import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
const Achievements = lazy(() => import('../pages/Achievements'));
const Activities = lazy(() => import('../pages/Activities'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Game = lazy(() => import('../pages/Game'));

/* 
  The object controls the in game routes
*/
const InGameRoutes = () => {
  return (
    <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/achievements" exact component={Achievements} />
        <Route path="/activities" exact component={Activities} />
        <Route path="/game" component={Game} />
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
    </Switch>
  )
};

export default InGameRoutes;
