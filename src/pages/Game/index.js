import React, { useState, useEffect, lazy, Suspense } from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

// Component
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Contexts
import { useAuth } from '../../contexts/Authorization';

// Services
import api from '../../services/api';

import './styles.css';

// Subpages
const InfoForm = lazy(() => import('../../components/Game/InfoForm'));

const Game = () => {
  // States
  const [game, setGame] = useState({});

  // Hooks
  const match = useRouteMatch();
  const { signOut } = useAuth();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try{
        const {data} = await api.get('/game/5ebc0a1e1da3fa28f4a455a7');

        setGame(data);
        history.push(`${match.url}/info`);
      }
      catch(error){
        const { response: { data } } = error;
        console.error(error);

        if(data.error === "TokenExpiredError: jwt expired"){
          signOut()
        }
      }
    })();
  }, [signOut, history, match.url]);

  return (
    <>
      <Helmet>
        <title>Configurações</title>
      </Helmet>
      <PageWrapper title="Configurações">
        <div className="row">
          <aside className="sidenav">
            Sidenav
          </aside>
          <main className="content">
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path={`${match.path}/info`} exact >
                  <InfoForm game={game} />
                </Route>
                <Route path={`${match.path}`} component={Loading} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </PageWrapper>
    </>
  )
};

export default Game;
