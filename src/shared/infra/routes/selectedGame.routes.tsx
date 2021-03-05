import React from 'react';
import DashboardRoutes from 'modules/dashboard/infra/routes';
import { Redirect, Switch } from 'react-router';

const SelectedGameRoutes: React.FC = () => (
  <Switch>
    <DashboardRoutes />
    <Redirect from="*" to="/" />
  </Switch>
);

export default SelectedGameRoutes;
