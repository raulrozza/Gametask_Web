import React, { useCallback } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ToastProviderContext } from 'shared/container/providers/ToastProvider/contexts/useToastProvider';
import IToastProvider from 'shared/container/providers/ToastProvider/models/IToastProvider';

import 'react-toastify/dist/ReactToastify.min.css';

const ReactToastifyToastProvider: React.FC = ({ children }) => {
  const showError = useCallback<IToastProvider['showError']>(message => {
    toast.error(message, { toastId: message });
  }, []);

  const showInfo = useCallback<IToastProvider['showInfo']>(message => {
    toast.info(message, { toastId: message });
  }, []);

  const showSuccess = useCallback<IToastProvider['showSuccess']>(message => {
    toast.success(message, { toastId: message });
  }, []);

  return (
    <ToastProviderContext.Provider value={{ showError, showInfo, showSuccess }}>
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
    </ToastProviderContext.Provider>
  );
};

export default ReactToastifyToastProvider;
