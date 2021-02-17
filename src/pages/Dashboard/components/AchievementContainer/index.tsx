import React, { useState, memo } from 'react';

// Assets
import placeholder from 'assets/img/achievements/placeholder.png';

// Components
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { Link } from 'react-router-dom';

// Icons
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Styles
import { AchievementBox } from './styles';
import { useTheme } from 'styled-components';

// Utils
import { useAchievements } from './hooks';

const AchievementContainer: React.FC = () => {
  const [minmax, setMinmax] = useState(false);
  const { achievements, loading } = useAchievements();

  const theme = useTheme();

  return (
    <AchievementBox>
      {!(!loading && achievements.length === 0) ? (
        <div
          className={`achievement-container container ${
            minmax ? 'maximized' : ''
          }`}
        >
          {!loading
            ? achievements.map(achievement => (
                <div
                  className="achievement"
                  key={`achievement-${achievement._id}`}
                >
                  <picture>
                    <source
                      srcSet={
                        achievement.image ? achievement.image_url : undefined
                      }
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
                      background={theme.palette.primary.dark}
                      height="80px"
                      circle
                    />
                  </div>

                  <div className="achievement-name">
                    <SkeletonLoader
                      background={theme.palette.primary.dark}
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

export default memo(AchievementContainer);
