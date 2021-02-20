import React, { Suspense } from 'react';

// Components
import { BrowserRouter, Switch } from 'react-router-dom';
import { Loading } from 'shared/view/components';

// Hooks
import useSessionProvider from 'shared/container/providers/SessionProvider/contexts/useSessionProvider';

const Routes: React.FC = () => {
  const session = useSessionProvider();

  if (session.loading) return <Loading />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <div />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
