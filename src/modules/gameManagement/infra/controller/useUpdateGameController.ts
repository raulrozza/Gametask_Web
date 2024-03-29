import { useCallback, useMemo, useState } from 'react';

import IUpdateGameDTO from 'modules/gameManagement/domain/dtos/IUpdateGameDTO';
import makeUpdateGameService from 'modules/gameManagement/services/factories/makeUpdateGameService';
import { useSessionContext, useToastContext } from 'shared/view/contexts';

interface UseUpdateGameController {
  loading: boolean;
  updateGame(data: IUpdateGameDTO): Promise<boolean>;
}

export default function useUpdateGameController(): UseUpdateGameController {
  const [loading, setLoading] = useState(false);

  const updateGameService = useMemo(() => makeUpdateGameService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const updateGame = useCallback<UseUpdateGameController['updateGame']>(
    async data => {
      setLoading(true);

      const { error, shouldLogout } = await updateGameService.execute(data);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return false;
      }

      return true;
    },
    [session, toast, updateGameService],
  );

  return { loading, updateGame };
}
