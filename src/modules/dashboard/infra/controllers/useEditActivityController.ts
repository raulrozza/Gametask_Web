import { useCallback, useMemo, useState } from 'react';

import IEditActivityDTO from 'modules/dashboard/dtos/IEditActivityDTO';
import IActivity from 'modules/dashboard/entities/IActivity';
import makeEditActivityService from 'modules/dashboard/services/factories/makeEditActivityService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseEditActivityController {
  loading: boolean;
  editActivity(data: IEditActivityDTO): Promise<IActivity | null>;
}

export default function useEditActivityController(): UseEditActivityController {
  const [loading, setLoading] = useState(false);

  const editActivityService = useMemo(() => makeEditActivityService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const editActivity = useCallback(
    async (data: IEditActivityDTO) => {
      setLoading(true);

      const {
        activity,
        error,
        shouldLogout,
      } = await editActivityService.execute(data);

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return null;
      }

      toast.showSuccess('Atividade alterada com sucesso!');
      return activity || null;
    },
    [editActivityService, session, toast],
  );

  return {
    loading,
    editActivity,
  };
}
