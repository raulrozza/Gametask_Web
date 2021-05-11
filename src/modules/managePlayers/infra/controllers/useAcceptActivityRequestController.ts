import { useCallback, useMemo, useState } from 'react';
import makeAcceptActivityRequestService from 'modules/managePlayers/services/factories/makeAcceptActivityRequestService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

interface UseAcceptActivityRequestController {
  loading: boolean;
  acceptActivityRequest(id: string): Promise<boolean>;
}

export default function useAcceptActivityRequestController(): UseAcceptActivityRequestController {
  const [loading, setLoading] = useState(false);

  const acceptActivityRequestService = useMemo(
    () => makeAcceptActivityRequestService(),
    [],
  );
  const toast = useToastContext();
  const session = useSessionContext();

  const acceptActivityRequest = useCallback(
    async (id: string) => {
      setLoading(true);

      const {
        error,
        shouldLogout,
      } = await acceptActivityRequestService.execute(id);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return false;
      }

      toast.showSuccess('Você validou esta requisição!');

      return true;
    },
    [acceptActivityRequestService, session, toast],
  );

  return {
    loading,
    acceptActivityRequest,
  };
}
