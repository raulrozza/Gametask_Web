import { useCallback, useMemo, useState } from 'react';
import makeCreateTitleService from 'modules/dashboard/services/factories/makeCreateTitleService';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import { useToastContext } from 'shared/view/contexts';
import ICreateTitleDTO from 'modules/dashboard/dtos/ICreateTitleDTO';
import ITitle from 'modules/dashboard/entities/ITitle';

interface UseCreateTitleController {
  loading: boolean;
  createTitle(data: ICreateTitleDTO): Promise<ITitle | null>;
}

export default function useCreateTitleController(): UseCreateTitleController {
  const [loading, setLoading] = useState(false);

  const createTitleService = useMemo(() => makeCreateTitleService(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const createTitle = useCallback(
    async (data: ICreateTitleDTO) => {
      setLoading(true);

      const { title, error, shouldLogout } = await createTitleService.execute(
        data,
      );

      setLoading(false);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return null;
      }

      return title || null;
    },
    [createTitleService, session, toast],
  );

  return { loading, createTitle };
}
