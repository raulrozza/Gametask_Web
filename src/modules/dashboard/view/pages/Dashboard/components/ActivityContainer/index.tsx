import React, { memo } from 'react';

// Components
import { Link } from 'react-router-dom';
import {
  ActivityCard,
  ActivitiesSkeletons,
  ExpandableBox,
  NoActivities,
} from '..';

// Hooks
import useFetchActivitiesController from 'modules/dashboard/infra/controllers/useFetchActivitiesController';
import { useExpandController } from 'modules/dashboard/view/hooks';

// Styles
import { ActivitiesWrapper } from './styles';

const ActivityContainer: React.FC = () => {
  const { activities, loading } = useFetchActivitiesController();
  const {
    expanded,
    toggleExpand,
    legend,
    Icon: ExpandIcon,
  } = useExpandController();

  const hasNoActivities = !loading && activities.length === 0;

  return (
    <ExpandableBox.Box>
      {hasNoActivities ? (
        <NoActivities />
      ) : (
        <ActivitiesWrapper $expanded={expanded}>
          {loading ? (
            <ActivitiesSkeletons />
          ) : (
            activities.map(activity => (
              <ActivityCard {...activity} key={activity.id} />
            ))
          )}
        </ActivitiesWrapper>
      )}

      <ExpandableBox.Footer>
        <Link to="/activities">Gerenciar Atividades</Link>

        <ExpandIcon onClick={toggleExpand} title={legend} />
      </ExpandableBox.Footer>
    </ExpandableBox.Box>
  );
};

export default memo(ActivityContainer);
