import { useEffect, useMemo, useState } from 'react';
import makeGetGameDetailsService from 'modules/managePlayers/services/factories/makeGetGameDetailsService';
import IGame from 'shared/domain/entities/IGame';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

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
