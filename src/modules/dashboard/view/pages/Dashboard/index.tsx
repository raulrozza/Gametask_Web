import React from 'react';

// Custom Components
import { PageTitle, Loading } from 'shared/view/components';
import {
  AchievementContainer,
  ActivityContainer,
  GameSummary,
  Ranking,
} from './components';

import useGetGameController from 'modules/dashboard/infra/controllers/useGetGameController';

import { getPageTitle } from './helpers';
import { Column, Main } from './styles';

const Dashboard: React.FC = () => {
  const { loading, game } = useGetGameController();

  if (loading) return <Loading />;

  const title = getPageTitle(game.newRegisters);

  return (
    <Main>
      <PageTitle title={title} />

      <Ranking />

      <Column>
        <AchievementContainer />

        <ActivityContainer />
      </Column>

      <GameSummary game={game} />
    </Main>
  );
};

export default Dashboard;
