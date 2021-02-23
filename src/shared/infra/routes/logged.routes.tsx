import React from 'react';
import UserRoutes from 'modules/user/infra/routes';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

const LoggedRoutes: React.FC = () => {
  const session = useSessionContext();

  if (!session.userToken || session.selectedGame) return null;

  return (
    <>
      <UserRoutes />
    </>
  );
};

export default LoggedRoutes;
