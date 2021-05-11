import { useCallback, useMemo, useState } from 'react';
import makeEditTitleService from 'modules/managePlayers/services/factories/makeEditTitleService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import IEditTitleDTO from 'modules/managePlayers/dtos/IEditTitleDTO';

interface UseEditTitlesController {
  loading: boolean;
  editTitle(data: IEditTitleDTO): Promise<void>;
}

export default function useEditTitlesController(): UseEditTitlesController {
  const [loading, setLoading] = useState(false);

  const editService = useMemo(() => makeEditTitleService(), []);
  const toast = useToastContext();
  const session = useSessionContext();

  const editTitle = useCallback(
    async (data: IEditTitleDTO) => {
      setLoading(true);

      const { error, shouldLogout } = await editService.execute(data);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return;
      }

      toast.showSuccess('Título alterado com sucesso.');
    },
    [editService, session, toast],
  );

  return {
    loading,
    editTitle,
  };
}
