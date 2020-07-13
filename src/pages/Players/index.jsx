import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import { FaCheck } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';

// Services
import api from '../../services/api';

// Assets
import userPlaceholder from '../../assets/img/users/placeholder.png';

import './styles.css';

const Players = () => {
  const { loading, game } = useGame();
  // States
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try{
        const response = await api.get('activityRegisters');

        setRequests(response.data);
      } catch(error){
        console.error(error);
      }
    })();
  }, []);

  if(loading)
    return <Loading />;
  return (
    <>
      <Helmet>
        <title>{game.newRegisters && `(${game.newRegisters}) `}Gerenciar Jogadores - GameTask</title>
      </Helmet>
      <div className="players-container">
        <div className="requests-container">
          <ul className="request-list">
            {requests.map(({ requester: user, activity, ...request }) => (
              <li className="request" key={request._id}>
                <section className="main">
                  <img
                    src={user.image
                      ? user.profile_img
                      : userPlaceholder
                    }
                    alt={user.name}
                  />
                  <div>
                    <span className="title">
                      <strong>{user.firstname}</strong>
                      {` | `}
                      <strong>{activity.name} ({activity.experience} XP)</strong>
                    </span>
                    <span className="info">{request.information}</span>
                  </div>
                </section>
                <footer>
                  {request.requestDate}
                  <button className="details" type="button">Ver Mais</button>
                  <button className="confirm" type="button"><FaCheck /></button>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Players;
