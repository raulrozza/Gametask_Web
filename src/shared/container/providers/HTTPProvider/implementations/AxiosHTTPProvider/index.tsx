import axios from 'axios';
import React, { useCallback } from 'react';
import { HTTPProviderContext } from 'shared/container/providers/HTTPProvider/contexts/useHTTPProvider';
import IHTTPProvider from 'shared/container/providers/HTTPProvider/models/IHTTPProvider';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const AxiosHTTPProvider: React.FC = ({ children }) => {
  const addHeader = useCallback<IHTTPProvider['addHeader']>(
    (key, value) => (axiosInstance.defaults.headers[key] = value),
    [],
  );

  const removeHeader = useCallback<IHTTPProvider['removeHeader']>(
    key => delete axiosInstance.defaults.headers[key],
    [],
  );

  const deleteMethod = useCallback<IHTTPProvider['delete']>(
    (path, config) => axiosInstance.delete(path, config),
    [],
  );

  const get = useCallback<IHTTPProvider['get']>(
    (path, config) => axiosInstance.get(path, config),
    [],
  );

  const patch = useCallback<IHTTPProvider['patch']>(
    (path, body, config) => axiosInstance.patch(path, body, config),
    [],
  );

  const post = useCallback<IHTTPProvider['post']>(
    (path, body, config) => axiosInstance.post(path, body, config),
    [],
  );

  const put = useCallback<IHTTPProvider['put']>(
    (path, body, config) => axiosInstance.put(path, body, config),
    [],
  );

  return (
    <HTTPProviderContext.Provider
      value={{
        addHeader,
        removeHeader,
        delete: deleteMethod,
        get,
        patch,
        post,
        put,
      }}
    >
      {children}
    </HTTPProviderContext.Provider>
  );
};

export default AxiosHTTPProvider;
