import { useCallback, useMemo, useState } from 'react';
import ICreateActivityDTO from 'modules/dashboard/dtos/ICreateActivityDTO';
import makeCreateActivityService from 'modules/dashboard/services/factories/makeCreateActivityService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import IActivity from 'modules/dashboard/entities/IActivity';

interface UseCreateActivityController {
  loading: boolean;
  createActivity(data: ICreateActivityDTO): Promise<IActivity | null>;
}

export default function useCreateActivityController(): UseCreateActivityController {
  const [loading, setLoading] = useState(false);

  const createActivityService = useMemo(() => makeCreateActivityService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const createActivity = useCallback(
    async (data: ICreateActivityDTO) => {
      setLoading(true);

      const {
        activity,
        error,
        shouldLogout,
      } = await createActivityService.execute(data);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return null;
      }

      toast.showSuccess('Atividade criada!');
      return activity || null;
    },
    [createActivityService, session, toast],
  );

  return {
    loading,
    createActivity,
  };
}
