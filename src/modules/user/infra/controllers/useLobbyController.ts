import { useCallback, useEffect, useMemo, useState } from 'react';
import IGame from 'shared/domain/entities/IGame';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import makeListAllGamesService from 'modules/user/services/factories/makeListAllGamesService';

interface UseLobbyController {
  (): {
    loading: boolean;
    games: IGame[];
    fetchGames: () => Promise<void>;
  };
}

const useLobbyController: UseLobbyController = () => {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState<IGame[]>([]);

  const listAllGamesService = useMemo(() => makeListAllGamesService(), []);
  const toast = useToastContext();
  const session = useSessionContext();

  const fetchGames = useCallback(async () => {
    setLoading(true);

    const { games, error, shouldLogout } = await listAllGamesService.execute();

    if (error) {
      toast.showError(error);

      shouldLogout && (await session.logout());

      return;
    }

    if (games) setGames(games);

    setLoading(false);
  }, [listAllGamesService, session, toast]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return {
    loading,
    games,
    fetchGames,
  };
};

export default useLobbyController;
