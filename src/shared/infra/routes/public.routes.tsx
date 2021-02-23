import React from 'react';
import LandingRoutes from 'modules/landing/infra/routes';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

const PublicRoutes: React.FC = () => {
  const session = useSessionContext();

  if (session.userToken) return null;

  return (
    <>
      <LandingRoutes />
    </>
  );
};

export default PublicRoutes;
