import { useCallback, useMemo, useState } from 'react';

import ICreateGameDTO from 'modules/user/dtos/ICreateGameDTO';
import makeCreateGameService from 'modules/user/services/factories/makeCreateGameService';
import { useSessionContext} from 'shared/view/contexts';
import { useToastContext } from 'shared/view/contexts';

interface IHelpers {
  resetForm: () => void;
}

interface UseCreateGameControllerProps {
  onSuccess: () => Promise<void>;
  closeModal: () => void;
}

interface UseCreateGameController {
  (props: UseCreateGameControllerProps): {
    loading: boolean;
    onSubmit: (values: ICreateGameDTO, helpers: IHelpers) => Promise<void>;
  };
}

const useCreateGameController: UseCreateGameController = ({
  closeModal,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const createGame = useMemo(() => makeCreateGameService(), []);
  const toast = useToastContext();
  const session = useSessionContext();

  const onSubmit = useCallback(
    async (values: ICreateGameDTO, helpers: IHelpers) => {
      setLoading(true);

      const { game, error, shouldLogout } = await createGame.execute(values);

      if (error) {
        toast.showError(error);

        shouldLogout && (await session.logout());
      }

      if (game) {
        onSuccess();
        helpers.resetForm();
      }

      closeModal();
    },
    [closeModal, createGame, onSuccess, session, toast],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useCreateGameController;
