import React, { useState, lazy, Suspense } from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect, Link, useRouteMatch, useLocation } from 'react-router-dom';

// Component
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Libs
import { FaBars } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

import './styles.css';

// Subpages
const InfoForm = lazy(() => import('../../components/Game/InfoForm'));

const Game = () => {
  const [showMenu, setShowMenu] = useState(false);
  // Hooks
  const match = useRouteMatch();
  const location = useLocation();
  const { loading } = useGame();

  const sidenavItems = [
    {
      key: 'info',
      title: 'Informações gerais',
      url: `${match.url}/info`,
    },
    {
      key: 'leveling',
      title: 'Gerenciar níveis',
      url: `${match.url}/leveling`,
    },
  ]

  if(loading)
    return <Loading />
  return (
    <>
      <Helmet>
        <title>Configurações</title>
      </Helmet>
      <PageWrapper title="Configurações">
        <div className="row always-row">
          <aside className={`sidenav ${showMenu ? 'shown' : ''}`}>
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              <FaBars />
            </button>
            <ul>
              {sidenavItems.map(item => (
                <Link to={item.url} key={item.key}>
                  <li className={item.url === location.pathname ? "active" : ""}>
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </aside>
          <main className="content">
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path={`${match.path}/info`} exact >
                  <InfoForm />
                </Route>
                <Route path={`${match.path}*`}>
                  <Redirect to={`${match.url}/info`} />
                </Route>
              </Switch>
            </Suspense>
          </main>
        </div>
      </PageWrapper>
    </>
  )
};

export default Game;
