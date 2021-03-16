import { useCallback, useMemo, useState } from 'react';
import ITitle from 'modules/managePlayers/entities/ITitle';
import makeGetTitlesService from 'modules/managePlayers/services/factories/makeGetTitlesService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

interface UseFetchTitlesController {
  titles: ITitle[];
  fetchTitles: () => Promise<void> | undefined;
}

export default function useFetchTitlesController(): UseFetchTitlesController {
  const [titles, setTitles] = useState<ITitle[]>([]);

  const getTitlesService = useMemo(() => makeGetTitlesService(), []);

  const toast = useToastContext();
  const session = useSessionContext();

  const fetchTitles = useCallback(async () => {
    const { titles, error, shouldLogout } = await getTitlesService.execute();

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (titles) setTitles(titles);
  }, [getTitlesService, session, toast]);

  return {
    titles,
    fetchTitles,
  };
}
