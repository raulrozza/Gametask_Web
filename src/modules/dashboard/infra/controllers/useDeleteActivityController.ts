import { useCallback, useMemo, useState } from 'react';
import makeDeleteActivityService from 'modules/dashboard/services/factories/makeDeleteActivityService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseDeleteActivityController {
  loading: boolean;
  deleteActivity(id: string): Promise<void>;
}

export default function useDeleteActivityController(): UseDeleteActivityController {
  const [loading, setLoading] = useState(false);

  const deleteActivityService = useMemo(() => makeDeleteActivityService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const deleteActivity = useCallback(
    async (id: string) => {
      setLoading(true);

      const { error, shouldLogout } = await deleteActivityService.execute(id);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) return session.logout();
      }

      toast.showSuccess('Atividade removida com sucesso!');
    },
    [deleteActivityService, session, toast],
  );

  return {
    loading,
    deleteActivity,
  };
}
