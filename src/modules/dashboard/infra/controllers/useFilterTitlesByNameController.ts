import { useCallback, useMemo, useState } from 'react';

import lodash from 'lodash';

import ITitle from 'modules/dashboard/entities/ITitle';
import makeGetGamesTitlesService from 'modules/dashboard/services/factories/makeGetGamesTitlesService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

const DEBOUNCE_TIME = 500;

interface UseFilterTitlesByNameController {
  titles: ITitle[];
  filterTitles: (name?: string) => Promise<void> | undefined;
}

export default function useFilterTitlesByNameController(): UseFilterTitlesByNameController {
  const [titles, setTitles] = useState<ITitle[]>([]);

  const getGameTitlesService = useMemo(() => makeGetGamesTitlesService(), []);

  const toast = useToastContext();
  const session = useSessionContext();

  const filterTitles = useCallback(
    lodash.debounce(async (name?: string) => {
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
    }, DEBOUNCE_TIME),
    [getGameTitlesService, session, toast],
  );

  return {
    titles,
    filterTitles,
  };
}
