import { toast } from 'react-toastify';

const displayInfoMessage = (message: string, messageCode?: number): void => {
  toast.info(message, { toastId: messageCode });
};

export default displayInfoMessage;
