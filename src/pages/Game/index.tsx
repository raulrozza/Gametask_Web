import React, { useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import {
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';

// Component
import Loading from '../../components/Loading';
import PageWrapper from '../../components/PageWrapper';

// Libs
import { FaBars } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

import { Row, SideNav, TabItem, Content } from './styles';

// Subpages
const InfoForm = lazy(() => import('./InfoForm'));
const LevelConfig = lazy(() => import('../../components/Game/LevelConfig'));
const RankConfig = lazy(() => import('../../components/Game/RankConfig'));

const Game: React.FC = () => {
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
    {
      key: 'ranks',
      title: 'Gerenciar patentes',
      url: `${match.url}/ranks`,
    },
  ];

  if (loading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Configurações - GameTask</title>
      </Helmet>
      <PageWrapper title="Configurações">
        <Row>
          <SideNav shown={showMenu}>
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              <FaBars />
            </button>

            <ul>
              {sidenavItems.map(item => (
                <Link
                  to={item.url}
                  key={item.key}
                  onClick={() => setShowMenu(false)}
                >
                  <TabItem active={item.url === location.pathname}>
                    {item.title}
                  </TabItem>
                </Link>
              ))}
            </ul>
          </SideNav>

          <Content>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path={`${match.path}/info`} exact>
                  <InfoForm />
                </Route>

                <Route path={`${match.path}/leveling`} exact>
                  <LevelConfig />
                </Route>

                <Route path={`${match.path}/ranks`} exact>
                  <RankConfig />
                </Route>

                <Route path={`${match.path}*`}>
                  <Redirect to={`${match.url}/info`} />
                </Route>
              </Switch>
            </Suspense>
          </Content>
        </Row>
      </PageWrapper>
    </>
  );
};

export default Game;
