import { useCallback, useMemo, useState } from 'react';

import IEditTitleDTO from 'modules/managePlayers/domain/dtos/IEditTitleDTO';
import makeEditTitleService from 'modules/managePlayers/services/factories/makeEditTitleService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

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
