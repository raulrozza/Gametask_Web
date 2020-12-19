import { useCallback } from 'react';

// Hooks
import { useErrorHandling } from 'hooks/api';

// Services
import { api } from 'services';

// Types
import { ApiDelete } from 'interfaces/hooks/UseApiDelete';

export function useApiDelete<T = unknown>(): ApiDelete<T> {
  const handleApiErrors = useErrorHandling();

  const apiDelete = useCallback(
    async (URL: string) => {
      try {
        const response = await api.instance.delete<T>(URL);

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
