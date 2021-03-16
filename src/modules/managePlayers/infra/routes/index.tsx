import React from 'react';
import { Route } from 'react-router';
import General from 'modules/managePlayers/view/pages/General';

const ManagePlayersRoutes: React.FC = () => (
  <Route path="/manage-players" exact component={General} />
);

export default ManagePlayersRoutes;
