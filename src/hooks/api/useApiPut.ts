import { useCallback } from 'react';

// Hooks
import { useErrorHandling } from './useErrorHandling';

// Services
import { api } from '../../services';

// Types
import { ApiPut } from '../../interfaces/hooks/UseApiPut';

export function useApiPut<T = unknown>(): ApiPut<T> {
  const handleApiErrors = useErrorHandling();

  const apiPut = useCallback(
    async (URL: string, body: unknown, headers: unknown = {}) => {
      try {
        const response = await api.instance.put<T>(URL, body, {
          headers,
        });

        return response.data;
      } catch (error) {
        handleApiErrors(error);
        return null;
      }
    },
    [handleApiErrors],
  );

  return apiPut;
}
