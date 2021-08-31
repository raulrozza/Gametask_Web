import { useCallback, useMemo, useState } from 'react';

import makeDeleteAchievementRequestService from 'modules/managePlayers/services/factories/makeDeleteAchievementRequestService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

interface UseDeleteAchievementRequestController {
  loading: boolean;
  deleteAchievementRequest(id: string): Promise<boolean>;
}

export default function useDeleteAchievementRequestController(): UseDeleteAchievementRequestController {
  const [loading, setLoading] = useState(false);

  const deleteAchievementRequestService = useMemo(
    () => makeDeleteAchievementRequestService(),
    [],
  );
  const toast = useToastContext();
  const session = useSessionContext();

  const deleteAchievementRequest = useCallback(
    async (id: string) => {
      setLoading(true);

      const {
        error,
        shouldLogout,
      } = await deleteAchievementRequestService.execute(id);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return false;
      }

      toast.showSuccess('Requisição excluída!');

      return true;
    },
    [deleteAchievementRequestService, session, toast],
  );

  return {
    loading,
    deleteAchievementRequest,
  };
}
