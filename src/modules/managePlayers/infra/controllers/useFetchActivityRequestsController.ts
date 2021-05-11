import { useCallback, useEffect, useMemo, useState } from 'react';
import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';
import makeListActivityRequestsService from 'modules/managePlayers/services/factories/makeListActivityRequestsService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

interface UseFetchActivityRequestsController {
  activityRequests: IActivityRequest[];
  loading: boolean;
  fetchActivityRequests: () => Promise<void> | undefined;
}

export default function useFetchActivityRequestsController(): UseFetchActivityRequestsController {
  const [loading, setLoading] = useState(true);
  const [activityRequests, setActivityRequests] = useState<IActivityRequest[]>(
    [],
  );

  const listActivityRequests = useMemo(
    () => makeListActivityRequestsService(),
    [],
  );

  const toast = useToastContext();
  const session = useSessionContext();

  const fetchActivityRequests = useCallback(async () => {
    setLoading(true);

    const {
      activityRequests,
      error,
      shouldLogout,
    } = await listActivityRequests.execute();

    setLoading(false);

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (activityRequests) setActivityRequests(activityRequests);
  }, [listActivityRequests, session, toast]);

  useEffect(() => {
    fetchActivityRequests();
  }, [fetchActivityRequests]);

  return {
    activityRequests,
    loading,
    fetchActivityRequests,
  };
}
