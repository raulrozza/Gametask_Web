// Constants
import { toastIds, toastMessages } from 'config/errors';

// Utils
import { displayErrorMessage } from 'utils';

export function handleForbiddenStatus(signOut: () => void): void {
  displayErrorMessage(toastMessages[toastIds.FORBIDDEN], toastIds.FORBIDDEN);
  signOut();
}
