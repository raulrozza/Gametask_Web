import React, { useCallback } from 'react';

import { Slide, toast, ToastContainer } from 'react-toastify';

import IToastContext from 'shared/domain/providers/IToastContext';
import { ToastContextProvider } from 'shared/view/contexts/ToastContext/hooks/useToastContext';

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
