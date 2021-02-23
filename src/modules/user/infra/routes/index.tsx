import React from 'react';

// Pages
import Lobby from 'modules/user/view/pages/Lobby';
import { Route } from 'react-router-dom';

const UserRoutes: React.FC = () => (
  <>
    <Route path="/" exact component={Lobby} />
  </>
);

export default UserRoutes;
