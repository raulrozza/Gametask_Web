import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Loaders
import SkeletonLoader from 'tiny-skeleton-loader-react';

// Types
import { IActivity } from 'game';
import { IThemedComponent } from 'theme';

// Styles
import { ActivityBox } from './styles';
import { withTheme } from 'styled-components';

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

ActivityContainer.propTypes = {
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    primaryTransparent: PropTypes.string.isRequired,
    primaryContrast: PropTypes.string.isRequired,
    primaryLowShade: PropTypes.string.isRequired,
    primaryShade: PropTypes.string.isRequired,
    primaryExtraShade: PropTypes.string.isRequired,
    primaryIntense: PropTypes.string.isRequired,
    primaryExtraIntense: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    secondaryTransparent: PropTypes.string.isRequired,
    secondaryContrast: PropTypes.string.isRequired,
    secondaryLowShade: PropTypes.string.isRequired,
    secondaryShade: PropTypes.string.isRequired,
    secondaryExtraShade: PropTypes.string.isRequired,
    secondaryIntense: PropTypes.string.isRequired,
    secondaryExtraIntense: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTheme(ActivityContainer);
