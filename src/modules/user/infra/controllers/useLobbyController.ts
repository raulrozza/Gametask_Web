import { useCallback, useEffect, useState } from 'react';
import useListAllGamesService from 'modules/user/services/useListAllGamesService';
import IGame from 'shared/entities/IGame';

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

  const listAllGamesService = useListAllGamesService();

  const fetchGames = useCallback(async () => {
    setLoading(true);

    const fetchedGames = await listAllGamesService.execute();

    setGames(fetchedGames);

    setLoading(false);
  }, [listAllGamesService]);

  useEffect(() => {
    fetchGames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    games,
    fetchGames,
  };
};

export default useLobbyController;
