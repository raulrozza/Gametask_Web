import { createContext, useContext } from 'react';
import ISessionProvider from 'shared/container/providers/SessionProvider/models/ISessionProvider';

export const SessionProviderContext = createContext<ISessionProvider>(
  {} as ISessionProvider,
);

const useSessionProvider = (): ISessionProvider => {
  const sessionProvider = useContext(SessionProviderContext);

  if (!sessionProvider)
    throw new Error(
      'useSessionProvider should be called inside a SessionProviderContext',
    );

  return sessionProvider;
};

export default useSessionProvider;
