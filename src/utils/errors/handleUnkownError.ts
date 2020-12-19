// Constants
import { toastIds, toastMessages } from 'config/errors';

// Utils
import { displayErrorMessage } from 'utils';

export function handleUnknownError(): void {
  displayErrorMessage(toastMessages[toastIds.UNKNOWN], toastIds.UNKNOWN);
}
