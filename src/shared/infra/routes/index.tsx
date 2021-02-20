import React from 'react';

// Components
import { Loading } from 'shared/view/components';

// Hooks
import useSessionProvider from 'shared/container/providers/SessionProvider/contexts/useSessionProvider';

const Routes: React.FC = () => {
  const session = useSessionProvider();

  if (session.loading) return <Loading />;
  return <div />;
};

export default Routes;
