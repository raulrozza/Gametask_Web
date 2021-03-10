import { useCallback, useEffect, useMemo, useState } from 'react';
import IActivity from 'modules/dashboard/entities/IActivity';
import makeListActivitiesService from 'modules/dashboard/services/factories/makeListActivitiesService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseFetchActivitiesController {
  loading: boolean;
  activities: IActivity[];
  fetchActivities(): Promise<void>;
}

export default function useFetchActivitiesController(): UseFetchActivitiesController {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const listActivities = useMemo(() => makeListActivitiesService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const fetchActivities = useCallback(async () => {
    const { activities, error, shouldLogout } = await listActivities.execute();

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (activities) setActivities(activities);

    setLoading(false);
  }, [listActivities, session, toast]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities, listActivities, session, toast]);

  return {
    loading,
    activities,
    fetchActivities,
  };
}
