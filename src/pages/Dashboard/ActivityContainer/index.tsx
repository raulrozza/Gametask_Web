import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

// Components
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Loaders
import SkeletonLoader from 'tiny-skeleton-loader-react';

// Styles
import { ActivityBox } from './styles';
import { withTheme } from 'styled-components';

// Types
import { IActivity } from 'game';
import { IThemedComponent } from '../../../interfaces/theme/ThemedComponent';

// Utils
import handleApiErrors from '../../../utils/handleApiErrors';

const ActivityContainer: React.FC<IThemedComponent> = ({ theme }) => {
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
        handleApiErrors(error);
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
                      background={theme.primaryShade}
                      height="100%"
                    />
                  </div>
                  <div className="activity-experience">
                    <SkeletonLoader
                      background={theme.primaryShade}
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

export default memo(withTheme(ActivityContainer));
