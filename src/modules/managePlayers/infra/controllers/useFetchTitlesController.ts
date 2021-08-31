import { useCallback, useEffect, useMemo, useState } from 'react';

import ITitle from 'modules/managePlayers/entities/ITitle';
import makeGetTitlesService from 'modules/managePlayers/services/factories/makeGetTitlesService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';

interface UseFetchTitlesController {
  titles: ITitle[];
  loading: boolean;
  fetchTitles: () => Promise<void> | undefined;
}

export default function useFetchTitlesController(): UseFetchTitlesController {
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState<ITitle[]>([]);

  const getTitlesService = useMemo(() => makeGetTitlesService(), []);

  const toast = useToastContext();
  const session = useSessionContext();

  const fetchTitles = useCallback(async () => {
    setLoading(true);

    const { titles, error, shouldLogout } = await getTitlesService.execute();

    setLoading(false);

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (titles) setTitles(titles);
  }, [getTitlesService, session, toast]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  return {
    titles,
    loading,
    fetchTitles,
  };
}
