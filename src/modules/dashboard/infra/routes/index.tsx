import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from 'modules/dashboard/view/pages/Dashboard';

const DashboardRoutes: React.FC = () => (
  <>
    <Route path="/" exact component={Dashboard} />
  </>
);

export default DashboardRoutes;
