import { useCallback } from 'react';

// Hooks
import { useAuth } from 'hooks';

// Types
import { HandleApiErrors } from 'interfaces';

// Utils
import {
  handleDefaultError,
  handleErrorWithoutResponse,
  handleForbiddenStatus,
  handleInternalErrorStatus,
  handleRequestErrors,
  handleUnknownError,
  isAxiosError,
} from 'utils';

export function useErrorHandling(): HandleApiErrors {
  const { signOut } = useAuth();

  const handleApiErrors: HandleApiErrors = useCallback(
    error => {
      if (isAxiosError(error)) {
        const response = error.response;

        if (!response) return handleErrorWithoutResponse();

        switch (response.status) {
          case 403:
            return handleForbiddenStatus(signOut);

          case 500:
            return handleInternalErrorStatus();

          case 400:
            return handleRequestErrors(response.data.code);

          default:
            return handleDefaultError();
        }
      } else handleUnknownError();
    },
    [signOut],
  );

  return handleApiErrors;
}
