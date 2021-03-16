import { useCallback, useMemo } from 'react';
import makeEditTitleService from 'modules/managePlayers/services/factories/makeEditTitleService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import IEditTitleDTO from 'modules/managePlayers/dtos/IEditTitleDTO';

interface UseEditTitlesController {
  editTitle(data: IEditTitleDTO): Promise<void>;
}

export default function useEditTitlesController(): UseEditTitlesController {
  const editService = useMemo(() => makeEditTitleService(), []);
  const toast = useToastContext();
  const session = useSessionContext();

  const editTitle = useCallback(
    async (data: IEditTitleDTO) => {
      const { error, shouldLogout } = await editService.execute(data);

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
    editTitle,
  };
}
