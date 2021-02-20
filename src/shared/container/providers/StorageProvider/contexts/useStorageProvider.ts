import { createContext, useContext } from 'react';
import IStorageProvider from 'shared/container/providers/StorageProvider/models/IStorageProvider';

export const StorageProviderContext = createContext<IStorageProvider>(
  {} as IStorageProvider,
);

const useStorageProvider = (): IStorageProvider => {
  const storageProvider = useContext(StorageProviderContext);

  if (!storageProvider)
    throw new Error(
      'useStorageProvider should only be used inside a StorageProviderContext',
    );

  return storageProvider;
};

export default useStorageProvider;
