// Constants
import { toastIds, toastMessages } from 'config/errors';

// Utils
import { displayErrorMessage } from 'utils';

export function handleInternalErrorStatus(): void {
  displayErrorMessage(
    toastMessages[toastIds.INTERNAL_ERROR],
    toastIds.INTERNAL_ERROR,
  );
}
