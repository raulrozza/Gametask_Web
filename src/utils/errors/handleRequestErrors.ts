// Constants
import { toastMessages, errorCodesToToastIds } from 'config/errors';

// Types
import { ErrorCode } from 'interfaces';

// Utils
import { handleDefaultError, displayErrorMessage } from 'utils';

export function handleRequestErrors(errorCode: ErrorCode): void {
  const messageCode = errorCodesToToastIds[errorCode];
  if (messageCode)
    return displayErrorMessage(toastMessages[messageCode], messageCode);

  handleDefaultError();
}
