import React from 'react';
import { Helmet } from 'react-helmet';

// Custom Components
import AchievementContainer from './AchievementContainer';
import ActivityContainer from './ActivityContainer';
import GameContainer from './GameContainer';
import Loading from '../../components/Loading';
import Ranking from './Ranking';

// Hooks
import { useGameData } from '../../hooks/contexts/useGameData';

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
