import { useEffect, useMemo, useState } from 'react';
import IAchievement from 'modules/dashboard/entities/IAchievement';
import makeListAchievementsService from 'modules/dashboard/services/factories/makeListAchievementsService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseFetchAchievementsController {
  loading: boolean;
  achievements: IAchievement[];
}

export default function useFetchAchievementsController(): UseFetchAchievementsController {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  const listAchievements = useMemo(() => makeListAchievementsService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  useEffect(() => {
    listAchievements
      .execute()
      .then(async ({ achievements, error, shouldLogout }) => {
        if (error) {
          toast.showError(error);

          if (shouldLogout) await session.logout();

          return;
        }

        if (achievements) setAchievements(achievements);

        setLoading(false);
      });
  }, [listAchievements, session, toast]);

  return {
    loading,
    achievements,
  };
}
