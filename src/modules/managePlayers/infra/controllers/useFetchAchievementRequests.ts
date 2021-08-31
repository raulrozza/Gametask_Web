import { useCallback, useEffect, useMemo, useState } from 'react';

import IAchievementRequest from 'modules/managePlayers/domain/entities/IAchievementRequest';
import makeListAchievementRequestsService from 'modules/managePlayers/services/factories/makeListAchievementRequestsService';
import { useSessionContext, useToastContext } from 'shared/view/contexts';

interface UseFetchAchievementRequestsController {
  achievementRequests: IAchievementRequest[];
  loading: boolean;
  fetchAchievementRequests: () => Promise<void> | undefined;
}

export default function useFetchAchievementRequestsController(): UseFetchAchievementRequestsController {
  const [loading, setLoading] = useState(true);
  const [achievementRequests, setAchievementRequests] = useState<
    IAchievementRequest[]
  >([]);

  const listAchievementRequests = useMemo(
    () => makeListAchievementRequestsService(),
    [],
  );

  const toast = useToastContext();
  const session = useSessionContext();

  const fetchAchievementRequests = useCallback(async () => {
    setLoading(true);

    const {
      achievementRequests,
      error,
      shouldLogout,
    } = await listAchievementRequests.execute();

    setLoading(false);

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (achievementRequests) setAchievementRequests(achievementRequests);
  }, [listAchievementRequests, session, toast]);

  useEffect(() => {
    fetchAchievementRequests();
  }, [fetchAchievementRequests]);

  return {
    achievementRequests,
    loading,
    fetchAchievementRequests,
  };
}
