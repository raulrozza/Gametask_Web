import React from 'react';
import { Route } from 'react-router';

const Settings = React.lazy(
  () => import('modules/gameManagement/view/pages/Settings'),
);

const GameManagementRoutes = (): JSX.Element[] => [
  <Route
    key="game-management-settings"
    path="/settings*"
    exact
    component={Settings}
  />,
];

export default GameManagementRoutes;
