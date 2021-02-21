import React, { useCallback } from 'react';

import useHTTPProvider from 'shared/container/providers/HTTPProvider/contexts/useHTTPProvider';

import { UsersRepositoryContext } from 'modules/landing/providers/UsersRepositoryProvider/contexts/useUsersRepository';
import IUsersRepository from 'modules/landing/providers/UsersRepositoryProvider/models/IUsersRepository';
import IUser from 'modules/landing/entities/IUser';
import IUserAuthentication from 'modules/landing/entities/IUserAuthentication';

const UsersRepository: React.FC = ({ children }) => {
  const httpProvider = useHTTPProvider();

  const create = useCallback<IUsersRepository['create']>(
    async ({ firstname, lastname, email, password, confirmPassword }) => {
      const result = await httpProvider.post<IUser>('users/signup', {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      });

      return result;
    },
    [httpProvider],
  );

  const validate = useCallback<IUsersRepository['validate']>(
    async ({ email, password }) => {
      const result = await httpProvider.post<IUserAuthentication>(
        'users/login',
        { email, password },
      );

      return result;
    },
    [httpProvider],
  );

  return (
    <UsersRepositoryContext.Provider value={{ create, validate }}>
      {children}
    </UsersRepositoryContext.Provider>
  );
};

export default UsersRepository;
