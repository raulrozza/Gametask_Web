import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';
import ILeaderboard from 'shared/domain/entities/ILeaderboard';
import makeGetCurrentLeaderboard from 'modules/dashboard/services/factories/makeGetCurrentLeaderboard';

interface UseGetCurrentLeaderboardController {
  loading: boolean;
  leaderboard: ILeaderboard | null;
  getLeaderboard(): Promise<void>;
}

export default function useGetCurrentLeaderboardController(): UseGetCurrentLeaderboardController {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard | null>(null);

  const getCurrentLeaderboard = useMemo(() => makeGetCurrentLeaderboard(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const getLeaderboard = useCallback(async () => {
    setLoading(true);

    const {
      leaderboard,
      error,
      shouldLogout,
    } = await getCurrentLeaderboard.execute();

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return;
    }

    if (leaderboard) setLeaderboard(leaderboard);

    setLoading(false);
  }, [getCurrentLeaderboard, session, toast]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return {
    loading,
    leaderboard,
    getLeaderboard,
  };
}
