// Constants
import { toastIds, toastMessages } from 'config/errors';

// Utils
import { displayErrorMessage } from 'utils';

export function handleErrorWithoutResponse(): void {
  displayErrorMessage(
    toastMessages[toastIds.NO_DATA_RESPONSE],
    toastIds.NO_DATA_RESPONSE,
  );
}
