import React, { useState, memo } from 'react';

// Assets
import placeholder from 'assets/img/achievements/placeholder.png';

// Components
import { Link } from 'react-router-dom';
import { AchievementSkeletons, ExpandableBox, NoAchievements } from '..';

// Icons
import { FaSortUp, FaSortDown } from 'react-icons/fa';

// Styles
import { AchievementsWrapper } from './styles';

// Utils
import useFetchAchievementsController from 'modules/dashboard/infra/controllers/useFetchAchievementsController';

const AchievementContainer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { achievements, loading } = useFetchAchievementsController();

  const hasNoAchievements = !loading && achievements.length === 0;

  return (
    <ExpandableBox.Box>
      {hasNoAchievements ? (
        <NoAchievements />
      ) : (
        <AchievementsWrapper $expanded={expanded}>
          {loading ? (
            <AchievementSkeletons />
          ) : (
            achievements.map(achievement => (
              <div
                className="achievement"
                key={`achievement-${achievement.id}`}
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
                    alt={`achievement-${achievement.id}-img`}
                  />
                </picture>

                <div className="achievement-name">{achievement.name}</div>
              </div>
            ))
          )}
        </AchievementsWrapper>
      )}

      <ExpandableBox.Footer>
        <Link to="/achievements">Gerenciar Conquistas</Link>
        {expanded ? (
          <FaSortUp
            onClick={() => setExpanded(!expanded)}
            title={`${expanded ? 'Minimizar' : 'Maximizar'} conquistas.`}
          />
        ) : (
          <FaSortDown
            onClick={() => setExpanded(!expanded)}
            title={`${expanded ? 'Minimizar' : 'Maximizar'} conquistas.`}
          />
        )}
      </ExpandableBox.Footer>
    </ExpandableBox.Box>
  );
};

export default memo(AchievementContainer);
