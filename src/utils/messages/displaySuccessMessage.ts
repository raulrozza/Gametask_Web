import { toast } from 'react-toastify';

const displaySuccessMessage = (message: string, messageCode?: number): void => {
  toast.success(message, { toastId: messageCode });
};

export default displaySuccessMessage;
