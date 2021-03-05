import { useCallback, useMemo, useState } from 'react';
import ICreateAchievementDTO from 'modules/dashboard/dtos/ICreateAchievementDTO';
import makeCreateAchievementService from 'modules/dashboard/services/factories/makeCreateAchievementService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import IAchievement from 'modules/dashboard/entities/IAchievement';

interface UseCreateAchievementController {
  loading: boolean;
  createAchievement(data: ICreateAchievementDTO): Promise<IAchievement | null>;
}

export default function useCreateAchievementController(): UseCreateAchievementController {
  const [loading, setLoading] = useState(false);

  const createAchievementService = useMemo(
    () => makeCreateAchievementService(),
    [],
  );
  const session = useSessionContext();
  const toast = useToastContext();

  const createAchievement = useCallback(
    async (data: ICreateAchievementDTO) => {
      setLoading(true);

      const {
        achievement,
        error,
        shouldLogout,
      } = await createAchievementService.execute(data);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return null;
      }

      return achievement || null;
    },
    [createAchievementService, session, toast],
  );

  return {
    loading,
    createAchievement,
  };
}
