import { useCallback, useEffect, useMemo, useState } from 'react';
import IActivity from 'modules/dashboard/domain/entities/IActivity';
import makeListActivitiesService from 'modules/dashboard/services/factories/makeListActivitiesService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

interface UseFetchActivitiesController {
  loading: boolean;
  activities: IActivity[];
  fetchActivities(): Promise<void>;
}

export default function useFetchActivitiesController(): UseFetchActivitiesController {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const listActivities = useMemo(() => makeListActivitiesService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const fetchActivities = useCallback(async () => {
    setLoading(true);

    const response = await listActivities.execute();
    if (response.error) {
      toast.showError(response.error);

      if (response.shouldLogout) await session.logout();

      return;
    }

    if (response.activities) setActivities(response.activities);

    setLoading(false);
  }, [listActivities, session, toast]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    loading,
    activities,
    fetchActivities,
  };
}
