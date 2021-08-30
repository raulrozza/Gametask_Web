import { useEffect, useMemo, useState } from 'react';

import makeGetGameDetailsService from 'modules/dashboard/services/factories/makeGetGameDetailsService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import IGame from 'shared/domain/entities/IGame';

interface UseGetGameController {
  loading: boolean;
  game: IGame;
}

export default function useGetGameController(): UseGetGameController {
  const [game, setGame] = useState<IGame>({} as IGame);
  const [loading, setLoading] = useState(true);

  const getGameDetailsService = useMemo(() => makeGetGameDetailsService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  useEffect(() => {
    getGameDetailsService
      .execute()
      .then(async ({ game, error, shouldLogout }) => {
        if (error) {
          toast.showError(error);

          if (shouldLogout) await session.logout();

          return;
        }

        if (game) setGame(game);

        setLoading(false);
      });
  }, [getGameDetailsService, session, toast]);

  return {
    game,
    loading,
  };
}
