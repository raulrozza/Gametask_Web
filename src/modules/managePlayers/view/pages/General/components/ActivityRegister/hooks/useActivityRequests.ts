// Hooks
import { useCallback, useEffect, useState } from 'react';
import {
  useApiDelete,
  useApiGet,
  useApiPost,
  useAuth,
  useGameData,
} from 'hooks';

// Types
import { IActivityRequest } from 'pages/Players/types';

// Utils
import {
  displaySuccessMessage,
  displayUpdateMessage,
  removeItemFromArray,
} from 'utils';
import { getRegisterData } from '../helpers';

interface UseActivityRequests {
  (): {
    requests: IActivityRequest[];
    loading: boolean;
    handleAcceptRegister: (id: string) => Promise<boolean>;
    handleDeleteRegister: (id: string) => Promise<void>;
  };
}

const useActivityRequests: UseActivityRequests = () => {
  const [requests, setRequests] = useState<IActivityRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const apiGet = useApiGet<IActivityRequest[]>();
  const apiDelete = useApiDelete();
  const apiPost = useApiPost();
  const { user } = useAuth();
  const { refreshGame } = useGameData();

  useEffect(() => {
    (async () => {
      const data = await apiGet('activityRegister');

      if (data) setRequests(data);
      setLoading(false);
    })();
  }, [apiGet]);

  const handleDeleteRegister = useCallback(
    async (id: string) => {
      if (window.confirm('Deseja realmente excluir esta requisição?')) {
        setRequests(requests =>
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );

        const success = await apiDelete(`/activityRegister/${id}`);

        if (success !== null) displayUpdateMessage('Requisição excluída');
      }
    },
    [apiDelete],
  );

  const handleAcceptRegister = useCallback(
    async (id: string) => {
      const request = requests.find(item => item._id === id);

      if (!request || !user) return false;

      if (!window.confirm('Confirmar pontuação?')) return false;

      const data = getRegisterData(user, request, id);

      setRequests(
        removeItemFromArray(
          requests,
          requests.findIndex(request => request._id === id),
        ),
      );

      const response = await apiPost('/experience', data);

      if (response === null) return false;

      displaySuccessMessage('Requisição aceita!');

      refreshGame();

      return true;
    },
    [apiPost, refreshGame, requests, user],
  );

  return {
    requests,
    loading,
    handleAcceptRegister,
    handleDeleteRegister,
  };
};

export default useActivityRequests;
