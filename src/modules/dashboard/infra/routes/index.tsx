import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from 'modules/dashboard/view/pages/Dashboard';

const Achievements = React.lazy(
  () => import('modules/dashboard/view/pages/Achievements'),
);

const DashboardRoutes: React.FC = () => (
  <>
    <Route path="/" exact component={Dashboard} />
    <Route path="/achievements" exact component={Achievements} />
  </>
);

export default DashboardRoutes;
