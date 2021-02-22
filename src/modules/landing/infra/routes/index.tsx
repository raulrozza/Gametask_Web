import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Hooks
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

// Pages
import Home from 'modules/landing/view/pages/Home';

const LandingRoutes: React.FC = () => {
  const session = useSessionContext();

  if (session.userToken) return null;

  return (
    <>
      <Route path="/" exact component={Home} />

      <Redirect path="*" exact to="/" />
    </>
  );
};

export default LandingRoutes;
