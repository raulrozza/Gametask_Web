import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from 'modules/dashboard/view/pages/Dashboard';

const Achievements = React.lazy(
  () => import('modules/dashboard/view/pages/Achievements'),
);
const Activities = React.lazy(
  () => import('modules/dashboard/view/pages/Activities'),
);

const DashboardRoutes = (): JSX.Element[] => [
  <Route key="dashboard" path="/" exact component={Dashboard} />,
  <Route
    key="achievements"
    path="/achievements"
    exact
    component={Achievements}
  />,
  <Route key="activities" path="/activities" exact component={Activities} />,
];

export default DashboardRoutes;
