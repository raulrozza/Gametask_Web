import { useEffect, useMemo, useState } from 'react';
import IActivity from 'modules/dashboard/entities/IActivity';
import makeListActivitiesService from 'modules/dashboard/services/factories/makeListActivitiesService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseFetchActivitiesController {
  loading: boolean;
  activities: IActivity[];
}

export default function useFetchActivitiesController(): UseFetchActivitiesController {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const listActivities = useMemo(() => makeListActivitiesService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  useEffect(() => {
    listActivities
      .execute()
      .then(async ({ activities, error, shouldLogout }) => {
        if (error) {
          toast.showError(error);

          if (shouldLogout) await session.logout();

          return;
        }

        if (activities) setActivities(activities);

        setLoading(false);
      });
  }, [listActivities, session, toast]);

  return {
    loading,
    activities,
  };
}
