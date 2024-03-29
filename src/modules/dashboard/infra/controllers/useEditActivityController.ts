import { useCallback, useMemo, useState } from 'react';

import IEditActivityDTO from 'modules/dashboard/domain/dtos/IEditActivityDTO';
import IActivity from 'modules/dashboard/domain/entities/IActivity';
import makeEditActivityService from 'modules/dashboard/services/factories/makeEditActivityService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

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
