import { useEffect, useMemo, useState } from 'react';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import ILeaderboard from 'shared/entities/ILeaderboard';
import makeGetCurrentLeaderboard from 'modules/dashboard/services/factories/makeGetCurrentLeaderboard';

interface UseGetCurrentLeaderboardController {
  loading: boolean;
  leaderboard: ILeaderboard | null;
}

export default function useGetCurrentLeaderboardController(): UseGetCurrentLeaderboardController {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard | null>(null);

  const getCurrentLeaderboard = useMemo(() => makeGetCurrentLeaderboard(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  useEffect(() => {
    getCurrentLeaderboard
      .execute()
      .then(async ({ leaderboard, error, shouldLogout }) => {
        if (error) {
          toast.showError(error);

          if (shouldLogout) await session.logout();

          return;
        }

        if (leaderboard) setLeaderboard(leaderboard);

        setLoading(false);
      });
  }, [getCurrentLeaderboard, session, toast]);

  return {
    loading,
    leaderboard,
  };
}
