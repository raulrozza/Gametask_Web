import { useCallback, useEffect, useMemo, useState } from 'react';
import IAchievement from 'modules/dashboard/entities/IAchievement';
import makeListAchievementsService from 'modules/dashboard/services/factories/makeListAchievementsService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseFetchAchievementsController {
  loading: boolean;
  achievements: IAchievement[];
  fetchAchievements(): Promise<void>;
}

export default function useFetchAchievementsController(): UseFetchAchievementsController {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  const listAchievements = useMemo(() => makeListAchievementsService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const fetchAchievements = useCallback(async () => {
    setLoading(true);

    const {
      achievements,
      error,
      shouldLogout,
    } = await listAchievements.execute();

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (achievements) setAchievements(achievements);

    setLoading(false);
  }, [listAchievements, session, toast]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements, listAchievements, session, toast]);

  return {
    loading,
    achievements,
    fetchAchievements,
  };
}
