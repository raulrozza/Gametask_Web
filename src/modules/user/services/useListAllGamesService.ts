import { useCallback, useMemo } from 'react';
import IGame from 'shared/entities/IGame';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import makeGamesRepository from 'modules/user/providers/factories/makeGamesRepository';

interface UseListAllGamesService {
  execute(): Promise<IGame[]>;
}

export default function useListAllGamesService(): UseListAllGamesService {
  const gamesRepository = useMemo(() => makeGamesRepository(), []);
  const toast = useToastContext();

  const execute = useCallback(async () => {
    try {
      const games = await gamesRepository.findAll();

      return games;
    } catch (error) {
      toast.showError(error.message);

      return [];
    }
  }, [gamesRepository, toast]);

  return { execute };
}
