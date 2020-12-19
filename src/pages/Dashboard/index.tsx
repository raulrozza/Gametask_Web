import React from 'react';

// Custom Components
import { Helmet } from 'react-helmet';
import { Loading } from 'components';
import {
  AchievementContainer,
  ActivityContainer,
  GameContainer,
  Ranking,
} from './components';

// Hooks
import { useGameData } from 'hooks';

// Styles
import { Main } from './styles';

const Dashboard: React.FC = () => {
  const { loading, game } = useGameData();

  if (loading) return <Loading />;

  if (!game) return null;

  const registerTitle = game.newRegisters ? `(${game.newRegisters}) ` : '';

  return (
    <Main>
      <Helmet>
        <title>{registerTitle}Dashboard - GameTask</title>
      </Helmet>

      <Ranking />

      <div className="column">
        <AchievementContainer />
        <ActivityContainer />
      </div>

      <GameContainer />
    </Main>
  );
};

export default Dashboard;
