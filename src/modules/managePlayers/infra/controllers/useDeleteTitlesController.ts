import { useCallback, useMemo, useState } from 'react';

import makeDeleteTitleService from 'modules/managePlayers/services/factories/makeDeleteTitleService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';

interface UseDeleteTitlesController {
  loading: boolean;
  deleteTitle(id: string): Promise<boolean>;
}

export default function useDeleteTitlesController(): UseDeleteTitlesController {
  const [loading, setLoading] = useState(false);

  const toast = useToastContext();
  const session = useSessionContext();

  const deleteTitleService = useMemo(() => makeDeleteTitleService(), []);

  const deleteTitle = useCallback(
    async (id: string) => {
      setLoading(true);

      const { error, shouldLogout } = await deleteTitleService.execute(id);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return false;
      }

      toast.showSuccess('Título removido com sucesso.');

      return true;
    },
    [deleteTitleService, session, toast],
  );

  return {
    loading,
    deleteTitle,
  };
}
