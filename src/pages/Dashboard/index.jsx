import React from 'react';
import { Helmet } from 'react-helmet';

// Custom Components
import AchievementContainer from '../../components/Dashboard/AchievementContainer';
import ActivityContainer from '../../components/Dashboard/ActivityContainer';
import GameContainer from '../../components/Dashboard/GameContainer';
import Loading from '../../components/Loading';
import Ranking from '../../components/Dashboard/Ranking';

// Contexts
import { useGame } from '../../contexts/Game';

import './styles.css';

const Dashboard = () => {
  const { loading, game } = useGame();

  if(loading)
    return <Loading />;
  return (
    <main className="dashboard">
      <Helmet>
        <title>{game.newRegisters && `(${game.newRegisters}) `}Dashboard - GameTask</title>
      </Helmet>
      <Ranking />
      <div className="column">
        <AchievementContainer />
        <ActivityContainer />
      </div>
      <GameContainer />
    </main>
  );
}

export default Dashboard;
