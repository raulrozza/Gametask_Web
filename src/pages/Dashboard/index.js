import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Custom Components
import AchievementContainer from '../../components/AchievementContainer';
import ActivityContainer from '../../components/ActivityContainer';
import GameContainer from '../../components/GameContainer';
import Loading from '../../components/Loading';
import Ranking from '../../components/Ranking';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

import './styles.css';

const Dashboard = () => {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try{
        const userInfo = getToken();
        if(!userInfo)
          history.push('/');

        const {data: game} = await api.get('/game/5ebc0a1e1da3fa28f4a455a7', {
          headers: {
            Authorization: 'Bearer '+userInfo.token,
          }
        });

        setGame(game);
        setLoading(false);
      }
      catch(error){
        const { response: { data } } = error;
        console.error(error);

        if(data.error === "TokenExpiredError: jwt expired"){
          localStorage.removeItem('loggedUser');
          history.push('/')
        }
      }
    })();
  }, [history]);

  if(loading)
    return <Loading />;
  return (
    <main className="dashboard">
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