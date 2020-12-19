import { AxiosError } from 'axios';

// Utils
import {
  handleDefaultError,
  handleErrorWithoutResponse,
  handleForbiddenStatus,
  handleInternalErrorStatus,
  handleRequestErrors,
  handleUnknownError,
  isAxiosError,
} from './errors';

const handleApiErrors: (
  error: Error | AxiosError,
  signOut?: () => void,
) => void = (error, signOut) => {
  if (isAxiosError(error)) {
    const response = error.response;

    if (!response) return handleErrorWithoutResponse();

    switch (response.status) {
      case 403:
        return handleForbiddenStatus(signOut || (() => undefined));

      case 500:
        return handleInternalErrorStatus();

      case 400:
        return handleRequestErrors(response.data.code);

      default:
        return handleDefaultError();
    }
  } else handleUnknownError();
};

export default handleApiErrors;
