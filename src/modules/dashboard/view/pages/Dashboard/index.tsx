import React from 'react';

// Custom Components
import { Loading } from 'components';
import {
  AchievementContainer,
  ActivityContainer,
  GameSummary,
  Ranking,
} from './components';

// Hooks
import useGetGameController from 'modules/dashboard/infra/controllers/useGetGameController';

// Styles
import { Main } from './styles';
import { PageTitle } from 'shared/view/components';
import { getPageTitle } from './helpers';

const Dashboard: React.FC = () => {
  const { loading, game } = useGetGameController();

  if (loading) return <Loading />;

  const title = getPageTitle(game.newRegisters);

  return (
    <Main>
      <PageTitle title={title} />

      {/* <Ranking />

      <div className="column">
        <AchievementContainer />
        <ActivityContainer />
      </div> */}

      <GameSummary game={game} />
    </Main>
  );
};

export default Dashboard;
