import React from 'react';
import { Route } from 'react-router-dom';

// Pages
import Home from 'modules/landing/view/pages/Home';

const LandingRoutes: React.FC = () => (
  <>
    <Route path="/" exact component={Home} />
  </>
);

export default LandingRoutes;
