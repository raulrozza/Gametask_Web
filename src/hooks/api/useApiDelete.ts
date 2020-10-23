import { useCallback } from 'react';

// Hooks
import { useErrorHandling } from './useErrorHandling';

// Services
import api from '../../services/api';

// Types
import { ApiDelete } from '../../interfaces/hooks/UseApiDelete';

export function useApiDelete<T = unknown>(): ApiDelete<T> {
  const handleApiErrors = useErrorHandling();

  const apiDelete = useCallback(
    async (URL: string) => {
      try {
        const response = await api.delete<T>(URL);

        return response.data;
      } catch (error) {
        handleApiErrors(error);
        return null;
      }
    },
    [handleApiErrors],
  );

  return apiDelete;
}
