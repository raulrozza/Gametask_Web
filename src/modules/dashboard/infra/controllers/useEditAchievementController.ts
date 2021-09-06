import { useCallback, useMemo, useState } from 'react';

import IEditAchievementDTO from 'modules/dashboard/domain/dtos/IEditAchievementDTO';
import IAchievement from 'modules/dashboard/domain/entities/IAchievement';
import makeEditAchievementService from 'modules/dashboard/services/factories/makeEditAchievementService';
import { useSessionContext, useToastContext } from 'shared/view/contexts';

interface UseEditAchievementController {
  loading: boolean;
  editAchievement(data: IEditAchievementDTO): Promise<IAchievement | null>;
}

export default function useEditAchievementController(): UseEditAchievementController {
  const [loading, setLoading] = useState(false);

  const editAchievementService = useMemo(
    () => makeEditAchievementService(),
    [],
  );
  const session = useSessionContext();
  const toast = useToastContext();

  const editAchievement = useCallback(
    async (data: IEditAchievementDTO) => {
      setLoading(true);

      const {
        achievement,
        error,
        shouldLogout,
      } = await editAchievementService.execute(data);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return null;
      }

      toast.showSuccess('Conquista alterada com sucesso!');
      return achievement || null;
    },
    [editAchievementService, session, toast],
  );

  return {
    loading,
    editAchievement,
  };
}
