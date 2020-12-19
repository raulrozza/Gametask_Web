import { useCallback } from 'react';

// Hooks
import { useErrorHandling } from 'hooks';

// Services
import { api } from 'services';

// Types
import { ApiGet } from 'interfaces';
import { AxiosRequestConfig } from 'axios';

export function useApiGet<T = unknown>(): ApiGet<T> {
  const handleApiErrors = useErrorHandling();

  const apiGet = useCallback(
    async (URL: string, config?: AxiosRequestConfig) => {
      try {
        const response = await api.instance.get<T>(URL, config);

        return response.data;
      } catch (error) {
        handleApiErrors(error);
        return null;
      }
    },
    [handleApiErrors],
  );

  return apiGet;
}
