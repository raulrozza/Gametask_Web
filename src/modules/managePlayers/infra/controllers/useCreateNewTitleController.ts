import { useCallback, useMemo, useState } from 'react';

import makeCreateTitleService from 'modules/managePlayers/services/factories/makeCreateTitleService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

interface UseCreateNewTitleController {
  loading: boolean;
  createTitle(): Promise<boolean>;
}

export default function useCreateNewTitleController(): UseCreateNewTitleController {
  const [loading, setLoading] = useState(false);

  const toast = useToastContext();
  const session = useSessionContext();

  const createTitleService = useMemo(() => makeCreateTitleService(), []);

  const createTitle = useCallback(async () => {
    setLoading(true);

    const { error, shouldLogout } = await createTitleService.execute({
      name: 'Novo título',
    });

    setLoading(false);

    if (error) {
      toast.showError(error);

      if (shouldLogout) await session.logout();

      return false;
    }

    return true;
  }, [createTitleService, session, toast]);

  return {
    loading,
    createTitle,
  };
}
