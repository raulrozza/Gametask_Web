import { useCallback, useEffect, useMemo, useState } from 'react';
import makeGetGameDetailsService from 'modules/dashboard/services/factories/makeGetGameDetailsService';
import IGame from 'shared/domain/entities/IGame';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';

interface UseGetGameController {
  loading: boolean;
  game: IGame;
  fetchGame(): Promise<void>;
}

export default function useGetGameController(): UseGetGameController {
  const [game, setGame] = useState<IGame>({} as IGame);
  const [loading, setLoading] = useState(true);

  const getGameDetailsService = useMemo(() => makeGetGameDetailsService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const fetchGame = useCallback(async () => {
    const { game, error, shouldLogout } = await getGameDetailsService.execute();

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (game) setGame(game);

    setLoading(false);
  }, [getGameDetailsService, session, toast]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame, getGameDetailsService, session, toast]);

  return {
    game,
    loading,
    fetchGame,
  };
}
