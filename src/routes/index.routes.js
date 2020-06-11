import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// Components
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';

// Contexts
import { useAuth } from '../contexts/Authorization';
import Game from '../contexts/Game';

// Routes
import InGameRoutes from './inGame.routes';
import Default from './default.routes';

/* 
  The object controls the web page's routes, sending the correct page based on the URL entered by the user
*/
const Routes = () => {
  const { logged, loading } = useAuth();

  if(loading)
    return <Loading />
  return (
    <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            {logged ? (
              <Game>
                <InGameRoutes />
              </Game>
            ) : (
              <Default />
            )}
  
            <Route path='*' exact component={() => (<NotFound message={
              <>
                  404: Página não encontrada. <br/>Está perdido? Vá para a nossa <Link to="/">Página Principal</Link>.
              </>
            } />)} />
          </Switch>
        </Suspense>
    </BrowserRouter>
  )
};

export default Routes;
