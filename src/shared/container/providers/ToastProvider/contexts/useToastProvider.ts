import { createContext, useContext } from 'react';
import IToastProvider from 'shared/container/providers/ToastProvider/models/IToastProvider';

export const ToastProviderContext = createContext<IToastProvider>(
  {} as IToastProvider,
);

const useToastProvider = (): IToastProvider => {
  const toastProvider = useContext(ToastProviderContext);

  if (!toastProvider)
    throw new Error(
      'useToastProvider should be called inside a ToastProviderContext',
    );

  return toastProvider;
};

export default useToastProvider;
