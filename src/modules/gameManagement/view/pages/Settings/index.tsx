import React, { useState, useMemo, lazy, Suspense, useCallback } from 'react';

// Component
import Loading from 'components/Loading';
import PageWrapper from 'components/PageWrapper';

// Libs
import { FaBars } from 'react-icons/fa';

// Styles
import { Row, SideNav, TabItem, Content, MenuButton, TabList } from './styles';
import { PageTitle } from 'shared/view/components';

type RoutesEnum = 'info' | 'leveling' | 'ranks';

const ROUTES_ENUM: Record<RoutesEnum, number> = {
  info: 0,
  leveling: 1,
  ranks: 2,
};

interface ISidenavItem {
  key: RoutesEnum;
  title: string;
}

// Subpages
const InfoForm = lazy(() => import('../InfoForm'));
const LevelConfig = lazy(() => import('../LevelConfig'));
const RankConfig = lazy(() => import('../RankConfig'));

const Settings: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  // Hooks
  const [renderedRoute, setRenderedRoute] = useState(ROUTES_ENUM.info);

  const handleNavigate = useCallback(
    (key: RoutesEnum) => () => {
      const value = ROUTES_ENUM[key];

      setRenderedRoute(value);
      setShowMenu(false);
    },
    [],
  );

  const sidenavItems = useMemo<ISidenavItem[]>(
    () => [
      {
        key: 'info',
        title: 'Informações gerais',
      },
      {
        key: 'leveling',
        title: 'Gerenciar níveis',
      },
      {
        key: 'ranks',
        title: 'Gerenciar patentes',
      },
    ],
    [],
  );

  return (
    <>
      <PageTitle title="Configurações" />

      <PageWrapper title="Configurações">
        <Row>
          <SideNav shown={showMenu}>
            <MenuButton type="button" onClick={() => setShowMenu(!showMenu)}>
              <FaBars />
            </MenuButton>

            <TabList shown={showMenu}>
              {sidenavItems.map(item => (
                <TabItem
                  active={renderedRoute === ROUTES_ENUM[item.key]}
                  key={item.key}
                  onClick={handleNavigate(item.key)}
                >
                  {item.title}
                </TabItem>
              ))}
            </TabList>
          </SideNav>

          <Content>
            <Suspense fallback={<Loading />}>
              {renderedRoute === ROUTES_ENUM.info && <InfoForm />}

              {/* <Route path={`${match.path}/leveling`} exact>
                  <LevelConfig />
                </Route>

                <Route path={`${match.path}/ranks`} exact>
                  <RankConfig />
                </Route> */}
            </Suspense>
          </Content>
        </Row>
      </PageWrapper>
    </>
  );
};

export default Settings;
