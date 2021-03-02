import React, { memo } from 'react';

// Components
import { Link } from 'react-router-dom';
import { ActivitiesSkeletons, ExpandableBox, NoActivities } from '..';

// Hooks
import useFetchActivitiesController from 'modules/dashboard/infra/controllers/useFetchActivitiesController';
import { useExpandController } from 'modules/dashboard/view/hooks';

// Styles
import { ActivitiesWrapper } from './styles';

const ActivityContainer: React.FC = () => {
  const {
    expanded,
    toggleExpand,
    legend,
    Icon: ExpandIcon,
  } = useExpandController();
  const { loading, activities } = useFetchActivitiesController();

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
              <ActivityContainer key={activity.id} {...activity} />
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
