import React from 'react';
import { Route } from 'react-router';
import General from 'modules/managePlayers/view/pages/General';

const ManagePlayersRoutes = (): JSX.Element[] => [
  <Route
    path="/manage-players"
    key="manage-players"
    exact
    component={General}
  />,
];

export default ManagePlayersRoutes;
