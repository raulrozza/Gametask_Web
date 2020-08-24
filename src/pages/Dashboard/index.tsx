import React from 'react';
import { Helmet } from 'react-helmet';

// Custom Components
import AchievementContainer from './AchievementContainer';
import ActivityContainer from './ActivityContainer';
import GameContainer from './GameContainer';
import Loading from '../../components/Loading';
import Ranking from './Ranking';

// Contexts
import { useGame } from '../../contexts/Game';

import { Main } from './styles';

const Dashboard: React.FC = () => {
  const { loading, game } = useGame();

  if (loading) return <Loading />;

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
