import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from 'modules/dashboard/view/pages/Dashboard';

const Achievements = React.lazy(
  () => import('modules/dashboard/view/pages/Achievements'),
);
const Activities = React.lazy(
  () => import('modules/dashboard/view/pages/Activities'),
);

const DashboardRoutes: React.FC = () => (
  <>
    <Route path="/" exact component={Dashboard} />
    <Route path="/achievements" exact component={Achievements} />
    <Route path="/activities" exact component={Activities} />
  </>
);

export default DashboardRoutes;
