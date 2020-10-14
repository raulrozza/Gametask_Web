import { toast } from 'react-toastify';

const displayErrorMessage = (message: string, messageCode: number): void => {
  toast.error(message, { toastId: messageCode });
};

export default displayErrorMessage;
