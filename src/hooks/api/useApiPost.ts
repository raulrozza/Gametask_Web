import { useCallback } from 'react';

// Hooks
import { useErrorHandling } from './useErrorHandling';

// Services
import { api } from '../../services';

// Types
import { ApiPost } from '../../interfaces/hooks/UseApiPost';

export function useApiPost<T = unknown>(): ApiPost<T> {
  const handleApiErrors = useErrorHandling();

  const apiPost = useCallback(
    async (URL: string, body: unknown) => {
      try {
        const response = await api.instance.post<T>(URL, body);

        return response.data;
      } catch (error) {
        handleApiErrors(error);
        return null;
      }
    },
    [handleApiErrors],
  );

  return apiPost;
}
