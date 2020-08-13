import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import placeholder from '../../../assets/img/achievements/placeholder.png';

// Components
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Loaders
import SkeletonLoader from 'tiny-skeleton-loader-react';

// Types
import { IAchievement } from 'game';

// Styles
import { AchievementBox } from './styles';

const AchievementContainer: React.FC = () => {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [minmax, setMinmax] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/achievement');

        setAchievements(data);
        setLoadingData(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <AchievementBox>
      {!(!loadingData && achievements.length === 0) ? (
        <div
          className={`achievement-container container ${
            minmax ? 'maximized' : ''
          }`}
        >
          {!loadingData
            ? achievements.map(achievement => (
                <div
                  className="achievement"
                  key={`achievement-${achievement._id}`}
                >
                  <picture>
                    <source
                      srcSet={achievement.image && achievement.image_url}
                    />
                    <img
                      className="achievement-image"
                      src={placeholder}
                      alt={`achievement-${achievement._id}-img`}
                    />
                  </picture>
                  <div className="achievement-name">{achievement.name}</div>
                </div>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                <div
                  className="achievement"
                  key={`achievement-skeleton-${item}`}
                >
                  <div className="achievement-image">
                    <SkeletonLoader
                      background="var(--primary-shade)"
                      height="80px"
                      circle
                    />
                  </div>
                  <div className="achievement-name">
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
          Não existe nenhuma conquista no jogo. Que tal{' '}
          <Link to="/achievements">adicionar uma?</Link>
        </div>
      )}

      <div className="min-max">
        <Link to="/achievements">Gerenciar Conquistas</Link>
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
    </AchievementBox>
  );
};

export default AchievementContainer;
