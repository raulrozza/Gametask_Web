import { createContext, useContext } from 'react';
import IHTTPProvider from 'shared/container/providers/HTTPProvider/models/IHTTPProvider';

export const HTTPProviderContext = createContext<IHTTPProvider>(
  {} as IHTTPProvider,
);

const useHTTPProvider = (): IHTTPProvider => {
  const httpProvider = useContext(HTTPProviderContext);

  if (!httpProvider)
    throw new Error(
      'useHTTPProvider should be called inside a HTTPProviderContext',
    );

  return httpProvider;
};

export default useHTTPProvider;
