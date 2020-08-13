import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Loaders
import SkeletonLoader from 'tiny-skeleton-loader-react';

// Types
import { IActivity } from 'game';

// Styles
import { ActivityBox } from './styles';

const ActivityContainer: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [minmax, setMinmax] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/activity');

        setActivities(data);
        setLoadingData(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <ActivityBox>
      {!(!loadingData && activities.length === 0) ? (
        <div
          className={`activity-container container ${
            minmax ? 'maximized' : ''
          }`}
        >
          {!loadingData
            ? activities.map(activity => (
                <div className="activity" key={`activity-${activity._id}`}>
                  <div className="activity-name">{activity.name}</div>
                  <div className="activity-experience">
                    {activity.experience} XP
                  </div>
                </div>
              ))
            : [1, 2, 3, 4, 5].map(item => (
                <div
                  className="activity no-border"
                  key={`activity-skeleton-${item}`}
                >
                  <div className="activity-name">
                    <SkeletonLoader
                      background="var(--primary-shade)"
                      height="100%"
                    />
                  </div>
                  <div className="activity-experience">
                    <SkeletonLoader
                      background="var(--primary-shade)"
                      height="100%"
                    />
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <div className="no-data">
          Não há nenhuma atividade. <Link to="/activities">Cadastre</Link>{' '}
          alguma para que os jogadores possam pontuar!
        </div>
      )}

      <div className="min-max">
        <Link to="/activities">Gerenciar Atividades</Link>
        {minmax ? (
          <FaSortUp
            onClick={() => setMinmax(!minmax)}
            title={`${minmax ? 'Minimizar' : 'Maximizar'} conquistas.`}
          />
        ) : (
          <FaSortDown
            onClick={() => setMinmax(!minmax)}
            title={`${minmax ? 'Minimizar' : 'Maximizar'} conquistas.`}
          />
        )}
      </div>
    </ActivityBox>
  );
};

export default ActivityContainer;
