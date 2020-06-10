import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

// Custom Components
import AchievementContainer from '../../components/Dashboard/AchievementContainer';
import ActivityContainer from '../../components/Dashboard/ActivityContainer';
import GameContainer from '../../components/Dashboard/GameContainer';
import Loading from '../../components/Loading';
import Ranking from '../../components/Dashboard/Ranking';

// Contexts
import { useAuth } from '../../contexts/Authorization';

// Services
import api from '../../services/api';

import './styles.css';

const Dashboard = () => {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  useEffect(() => {
    (async () => {
      try{
        const {data: game} = await api.get('/game/5ebc0a1e1da3fa28f4a455a7');

        setGame(game);
        setLoading(false);
      }
      catch(error){
        console.error(error);
        if(!error.response)
          return;
        const { response: { data } } = error;

        if(data.error === "TokenExpiredError: jwt expired"){
          signOut();
        }
      }
    })();
  }, [signOut]);

  if(loading)
    return <Loading />;
  return (
    <main className="dashboard">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Ranking ranking={game.weeklyRanking} />
      <div className="column">
        <AchievementContainer />
        <ActivityContainer />
      </div>
      <GameContainer game={game} />
    </main>
  );
}

export default Dashboard;
