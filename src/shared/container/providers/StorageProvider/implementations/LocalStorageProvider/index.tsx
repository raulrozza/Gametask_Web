import React, { useCallback } from 'react';
import { StorageProviderContext } from 'shared/container/providers/StorageProvider/contexts/useStorageProvider';
import IStorageProvider from 'shared/container/providers/StorageProvider/models/IStorageProvider';

const LocalStorageProvider: React.FC = ({ children }) => {
  const clear = useCallback<IStorageProvider['clear']>(
    async () => localStorage.clear(),
    [],
  );

  const deleteMethod = useCallback<IStorageProvider['delete']>(
    async key => localStorage.removeItem(key),
    [],
  );

  const get = useCallback<IStorageProvider['get']>(async key => {
    const stringifiedData = localStorage.getItem(key);

    if (!stringifiedData) return null;

    return JSON.parse(stringifiedData);
  }, []);

  const store = useCallback<IStorageProvider['store']>(async (key, data) => {
    const stringifiedData = JSON.stringify(data);

    localStorage.setItem(key, stringifiedData);
  }, []);

  return (
    <StorageProviderContext.Provider
      value={{ clear, delete: deleteMethod, get, store }}
    >
      {children}
    </StorageProviderContext.Provider>
  );
};

export default LocalStorageProvider;
