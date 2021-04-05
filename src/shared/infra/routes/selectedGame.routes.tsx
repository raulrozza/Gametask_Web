import React from 'react';
import { Redirect } from 'react-router';
import DashboardRoutes from 'modules/dashboard/infra/routes';
import ManagePlayersRoutes from 'modules/managePlayers/infra/routes';
import GameManagementRoutes from 'modules/gameManagement/infra/routes';

const SelectedGameRoutes = (): JSX.Element[] => [
  ...DashboardRoutes(),
  ...ManagePlayersRoutes(),
  ...GameManagementRoutes(),
  <Redirect key="selected-game-redirect" from="*" to="/" />,
];

export default SelectedGameRoutes;
