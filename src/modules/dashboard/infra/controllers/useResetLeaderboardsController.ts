import { useCallback, useMemo, useState } from 'react';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';
import makeResetLeaderboardsService from 'modules/dashboard/services/factories/makeResetLeaderboardsService';

interface UseResetLeaderboardsController {
  loading: boolean;
  resetLeaderboards(): Promise<boolean>;
}

export default function useResetLeaderboardsController(): UseResetLeaderboardsController {
  const [loading, setLoading] = useState(false);

  const resetLeaderboardsService = useMemo(
    () => makeResetLeaderboardsService(),
    [],
  );
  const session = useSessionContext();
  const toast = useToastContext();

  const resetLeaderboards = useCallback(async () => {
    setLoading(true);

    const result = await resetLeaderboardsService.execute();

    setLoading(false);

    if (result.error) {
      toast.showError(result.error);

      if (result.shouldLogout) await session.logout();

      return false;
    }

    return true;
  }, [resetLeaderboardsService, session, toast]);

  return {
    loading,
    resetLeaderboards,
  };
}
