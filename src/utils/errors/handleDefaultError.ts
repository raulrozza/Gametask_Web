// Constants
import { toastIds, toastMessages } from 'config/errors';

// Utils
import { displayErrorMessage } from 'utils';

export function handleDefaultError(): void {
  displayErrorMessage(
    toastMessages[toastIds.DEFAULT_TOAST],
    toastIds.DEFAULT_TOAST,
  );
}
