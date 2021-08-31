import { useCallback, useMemo, useState } from 'react';

import makeDeleteActivityRequestService from 'modules/managePlayers/services/factories/makeDeleteActivityRequestService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';

interface UseDeleteActivityRequestController {
  loading: boolean;
  deleteActivityRequest(id: string): Promise<boolean>;
}

export default function useDeleteActivityRequestController(): UseDeleteActivityRequestController {
  const [loading, setLoading] = useState(false);

  const deleteActivityRequestService = useMemo(
    () => makeDeleteActivityRequestService(),
    [],
  );
  const toast = useToastContext();
  const session = useSessionContext();

  const deleteActivityRequest = useCallback(
    async (id: string) => {
      setLoading(true);

      const {
        error,
        shouldLogout,
      } = await deleteActivityRequestService.execute(id);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return false;
      }

      toast.showSuccess('Requisição excluída!');

      return true;
    },
    [deleteActivityRequestService, session, toast],
  );

  return {
    loading,
    deleteActivityRequest,
  };
}
