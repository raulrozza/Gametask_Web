import { useCallback, useMemo, useState } from 'react';
import makeGrantAchievementService from 'modules/managePlayers/services/factories/makeGrantAchievementService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import IGrantAchievementDTO from 'modules/managePlayers/dtos/IGrantAchievementDTO';

interface UseGrantAchievementController {
  loading: boolean;
  grantAchievement(payload: IGrantAchievementDTO): Promise<boolean>;
}

export default function useGrantAchievementController(): UseGrantAchievementController {
  const [loading, setLoading] = useState(false);

  const grantAchievementService = useMemo(
    () => makeGrantAchievementService(),
    [],
  );
  const toast = useToastContext();
  const session = useSessionContext();

  const grantAchievement = useCallback<
    UseGrantAchievementController['grantAchievement']
  >(
    async payload => {
      setLoading(true);

      const { error, shouldLogout } = await grantAchievementService.execute(
        payload,
      );

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return false;
      }

      toast.showSuccess('Conquista desbloqueada!');

      return true;
    },
    [grantAchievementService, session, toast],
  );

  return {
    loading,
    grantAchievement,
  };
}
