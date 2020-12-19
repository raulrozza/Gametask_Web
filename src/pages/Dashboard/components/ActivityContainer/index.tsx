import React, { useState, memo } from 'react';

// Components
import { Link } from 'react-router-dom';
import SkeletonLoader from 'tiny-skeleton-loader-react';

// Hooks
import { useActivities } from './hooks';
import { useTheme } from 'styled-components';

// Icons
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Styles
import { ActivityBox } from './styles';

const ActivityContainer: React.FC = () => {
  const [minmax, setMinmax] = useState(false);
  const { loading, activities } = useActivities();

  const theme = useTheme();

  return (
    <ActivityBox>
      {!(!loading && activities.length === 0) ? (
        <div
          className={`activity-container container ${
            minmax ? 'maximized' : ''
          }`}
        >
          {!loading
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

export default memo(ActivityContainer);
