import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Services
import api from '../../../services/api';
import getToken from '../../../services/getToken';

// Loaders
import SkeletonLoader from "tiny-skeleton-loader-react";

// Styles
import './styles.css';

const ActivityContainer = () => {
  const [activities, setActivities] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [minmax, setMinmax] = useState(false);

  useEffect(() => {
    (async () => {
      try{
        const userInfo = getToken();

        const {data} = await api.get('/activities', {
          headers: {
            Authorization: 'Bearer '+userInfo.token,
          }
        });

        setActivities(data);
        setLoadingData(false);
      }
      catch(error){
        console.error(error);
      }
    })();
  },[])

  return (
    <div className="info-box activity-box">
      <div className={`activity-container ${minmax ? "maximized" : ""}`}>
        {!loadingData ? activities.map(
          activity => (
            <div className="activity" key={`activity-${activity._id}`}>
              <div className="activity-name">
                {activity.name}
              </div>
              <div className="activity-experience">
                 {activity.experience} XP
              </div>
            </div>
          )
        ):(
          [1, 2, 3, 4, 5].map(item => (
            <div className="activity no-border" key={`activity-skeleton-${item}`}>
              <div className="activity-name">
                <SkeletonLoader height="100%" />
              </div>
              <div className="activity-experience">
                <SkeletonLoader height="100%" />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="activity-min-max">
        <Link to="/activities">Gerenciar Atividades</Link>
        <FontAwesomeIcon
          icon={`sort-${minmax ? "up" : "down"}`}
          onClick={() => setMinmax(!minmax)}
          title={`${minmax ? "Minimizar" : "Maximizar"} conquistas.`}
        />
      </div>
    </div>
  );
};

export default ActivityContainer;
