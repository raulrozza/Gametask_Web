// Constants
import { toastIds } from '../../config/errors/toastIds';
import { toastMessages } from '../../config/errors/toastMessages';

// Utils
import displayErrorMessage from '../messages/displayErrorMessage';

export function handleInternalErrorStatus(): void {
  displayErrorMessage(
    toastMessages[toastIds.INTERNAL_ERROR],
    toastIds.INTERNAL_ERROR,
  );
}
