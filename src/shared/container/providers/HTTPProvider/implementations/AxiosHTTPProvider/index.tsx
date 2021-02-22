import axios from 'axios';
import React, { useCallback } from 'react';
import { HTTPProviderContext } from 'shared/container/providers/HTTPProvider/contexts/useHTTPProvider';
import IHTTPProvider from 'shared/container/providers/HTTPProvider/models/IHTTPProvider';
import RequestError from 'shared/errors/entities/RequestError';

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
    async (path, config) => {
      try {
        const response = await axiosInstance.delete(path, config);
        return response.data;
      } catch (error) {
        throw new RequestError(error);
      }
    },
    [],
  );

  const get = useCallback<IHTTPProvider['get']>(async (path, config) => {
    try {
      const response = await axiosInstance.get(path, config);
      return response.data;
    } catch (error) {
      throw new RequestError(error);
    }
  }, []);

  const patch = useCallback<IHTTPProvider['patch']>(
    async (path, body, config) => {
      try {
        const response = await axiosInstance.patch(path, body, config);
        return response.data;
      } catch (error) {
        throw new RequestError(error);
      }
    },
    [],
  );

  const post = useCallback<IHTTPProvider['post']>(
    async (path, body, config) => {
      try {
        const response = await axiosInstance.post(path, body, config);
        return response.data;
      } catch (error) {
        throw new RequestError(error);
      }
    },
    [],
  );

  const put = useCallback<IHTTPProvider['put']>(async (path, body, config) => {
    try {
      const response = await axiosInstance.put(path, body, config);
      return response.data;
    } catch (error) {
      throw new RequestError(error);
    }
  }, []);

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
