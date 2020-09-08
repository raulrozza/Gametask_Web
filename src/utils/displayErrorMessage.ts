import { DisplayErrorMessage } from './types';
import { toast } from 'react-toastify';

const displayErrorMessage: DisplayErrorMessage = (message, messageCode) => {
  toast.error(message, { toastId: messageCode });
};

export default displayErrorMessage;
