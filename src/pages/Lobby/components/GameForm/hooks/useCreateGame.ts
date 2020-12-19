// Hooks
import { useApiPost } from 'hooks';
import { useCallback, useState } from 'react';

// Utils
import { displayErrorMessage } from 'utils';

// Types
import { UseCreateGame } from '../types';

const useCreateGame: UseCreateGame = ({ closeModal, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const apiPost = useApiPost();

  const onSubmit = useCallback(
    async values => {
      if (!values.image) {
        displayErrorMessage('Por favor, envie uma imagem!', 0);

        return;
      }

      setLoading(true);

      const data = new FormData();

      data.append('name', values.name);
      data.append('description', values.description);
      data.append('image', values.image);

      const result = await apiPost(`/game`, data);

      if (result !== null) onSuccess();

      closeModal();
    },
    [apiPost, closeModal, onSuccess],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useCreateGame;
