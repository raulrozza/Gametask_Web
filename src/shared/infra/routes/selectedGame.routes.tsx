import React from 'react';
import { Redirect } from 'react-router';
import DashboardRoutes from 'modules/dashboard/infra/routes';
import ManagePlayersRoutes from 'modules/managePlayers/infra/routes';

const SelectedGameRoutes = (): JSX.Element[] => [
  ...DashboardRoutes(),
  ...ManagePlayersRoutes(),
  <Redirect key="selected-game-redirect" from="*" to="/" />,
];

export default SelectedGameRoutes;
