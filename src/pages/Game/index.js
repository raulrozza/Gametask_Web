import React, { useState, useEffect, Suspense } from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

// Component
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

import './styles.css';

const Game = () => {
  // States
  const [game, setGame] = useState({});

  // Hooks
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try{
        const userInfo = getToken();
        if(!userInfo)
          history.push('/');

        const {data} = await api.get('/game/5ebc0a1e1da3fa28f4a455a7', {
          headers: {
            Authorization: 'Bearer '+userInfo.token,
          }
        });

        setGame(data);
      }
      catch(error){
        const { response: { data } } = error;
        console.error(error);

        if(data.error === "TokenExpiredError: jwt expired"){
          localStorage.removeItem('loggedUser');
          history.push('/')
        }
      }
    })();
  }, [history]);

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
