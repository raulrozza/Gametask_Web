import { useCallback, useMemo, useState } from 'react';
import ITitle from 'modules/dashboard/entities/ITitle';
import makeGetGamesTitlesService from 'modules/dashboard/services/factories/makeGetGamesTitlesService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

interface UseFilterTitlesByNameController {
  titles: ITitle[];
  filterTitles: (name?: string) => Promise<void>;
}

export default function useFilterTitlesByNameController(): UseFilterTitlesByNameController {
  const [titles, setTitles] = useState<ITitle[]>([]);

  const getGameTitlesService = useMemo(() => makeGetGamesTitlesService(), []);

  const toast = useToastContext();
  const session = useSessionContext();

  const filterTitles = useCallback(
    async (name?: string) => {
      const {
        titles,
        error,
        shouldLogout,
      } = await getGameTitlesService.execute(name);

      if (error) {
        toast.showError(error);

        if (shouldLogout) await session.logout();

        return;
      }

      if (titles) setTitles(titles);
    },
    [getGameTitlesService, session, toast],
  );

  return {
    titles,
    filterTitles,
  };
}
