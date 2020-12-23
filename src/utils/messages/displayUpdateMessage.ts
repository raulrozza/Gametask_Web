import { toast } from 'react-toastify';

const displayUpdateMessage = (message: string, messageCode?: number): void => {
  toast.update(message, { toastId: messageCode });
};

export default displayUpdateMessage;
