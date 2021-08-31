import { useCallback, useMemo, useState } from 'react';

import makeDeleteAchievementService from 'modules/dashboard/services/factories/makeDeleteAchievementService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';

interface UseDeleteAchievementController {
  loading: boolean;
  deleteAchievement(id: string): Promise<void>;
}

export default function useDeleteAchievementController(): UseDeleteAchievementController {
  const [loading, setLoading] = useState(false);

  const deleteAchievementService = useMemo(
    () => makeDeleteAchievementService(),
    [],
  );
  const session = useSessionContext();
  const toast = useToastContext();

  const deleteAchievement = useCallback(
    async (id: string) => {
      setLoading(true);

      const { error, shouldLogout } = await deleteAchievementService.execute(
        id,
      );

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) return session.logout();
      }

      toast.showSuccess('Conquista removida com sucesso!');
    },
    [deleteAchievementService, session, toast],
  );

  return {
    loading,
    deleteAchievement,
  };
}
