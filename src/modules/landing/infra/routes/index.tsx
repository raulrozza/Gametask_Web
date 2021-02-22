import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Hooks
import useSessionProvider from 'shared/container/providers/SessionProvider/contexts/useSessionProvider';

// Pages
import Home from 'modules/landing/view/pages/Home';

const LandingRoutes: React.FC = () => {
  const session = useSessionProvider();

  if (session.userToken) return null;

  return (
    <>
      <Route path="/" exact component={Home} />

      <Redirect path="*" exact to="/" />
    </>
  );
};

export default LandingRoutes;
