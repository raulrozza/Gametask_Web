import React, { memo } from 'react';

import { Link } from 'react-router-dom';
import {
  AchievementCard,
  AchievementSkeletons,
  ExpandableBox,
  NoAchievements,
} from '..';

import { useExpandController } from 'modules/dashboard/view/hooks';
import useFetchAchievementsController from 'modules/dashboard/infra/controllers/useFetchAchievementsController';

import { AchievementsWrapper } from './styles';

const AchievementContainer: React.FC = () => {
  const {
    expanded,
    toggleExpand,
    legend,
    Icon: ExpandIcon,
  } = useExpandController();
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
              <AchievementCard {...achievement} key={achievement.id} />
            ))
          )}
        </AchievementsWrapper>
      )}

      <ExpandableBox.Footer>
        <Link to="/achievements">Gerenciar Conquistas</Link>

        <ExpandIcon onClick={toggleExpand} title={legend} />
      </ExpandableBox.Footer>
    </ExpandableBox.Box>
  );
};

export default memo(AchievementContainer);
