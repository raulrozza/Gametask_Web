import React, { useCallback } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ToastContextProvider } from 'shared/container/contexts/ToastContext/contexts/useToastContext';
import IToastContext from 'shared/container/contexts/ToastContext/models/IToastContext';

import 'react-toastify/dist/ReactToastify.min.css';

const ReactToastifyToastContext: React.FC = ({ children }) => {
  const showError = useCallback<IToastContext['showError']>(message => {
    toast.error(message, { toastId: message });
  }, []);

  const showInfo = useCallback<IToastContext['showInfo']>(message => {
    toast.info(message, { toastId: message });
  }, []);

  const showSuccess = useCallback<IToastContext['showSuccess']>(message => {
    toast.success(message, { toastId: message });
  }, []);

  return (
    <ToastContextProvider.Provider value={{ showError, showInfo, showSuccess }}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        transition={Slide}
        pauseOnHover={false}
        limit={3}
      />
    </ToastContextProvider.Provider>
  );
};

export default ReactToastifyToastContext;
