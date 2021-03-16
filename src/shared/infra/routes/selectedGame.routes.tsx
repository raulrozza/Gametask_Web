import React from 'react';
import { Redirect, Switch } from 'react-router';
import DashboardRoutes from 'modules/dashboard/infra/routes';
import ManagePlayersRoutes from 'modules/managePlayers/infra/routes';

const SelectedGameRoutes: React.FC = () => (
  <Switch>
    {DashboardRoutes()}
    <ManagePlayersRoutes />
    <Redirect from="*" to="/" />
  </Switch>
);

export default SelectedGameRoutes;
