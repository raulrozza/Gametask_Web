import React, { Suspense } from 'react';

// Components
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Loading, NotFound } from 'shared/view/components';

// Hooks
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

// Routes
import PublicRoutes from './public.routes';
import LoggedRoutes from './logged.routes';
import SelectedGameRoutes from './selectedGame.routes';

const Routes: React.FC = () => {
  const session = useSessionContext();

  if (session.loading) return <Loading />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          {!session.userToken && PublicRoutes()}
          {session.userToken && !session.selectedGame && LoggedRoutes()}
          {session.userToken && session.selectedGame && SelectedGameRoutes()}

          <Route>
            <NotFound
              message={
                <>
                  404: Página não encontrada. <br />
                  Está perdido? Vá para a nossa{' '}
                  <Link to="/">Página Principal</Link>.
                </>
              }
            />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
