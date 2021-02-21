import { createContext, useContext } from 'react';
import IUsersRepository from 'modules/landing/providers/UsersRepositoryProvider/models/IUsersRepository';

export const UsersRepositoryContext = createContext<IUsersRepository>(
  {} as IUsersRepository,
);

const useUsersRepository = (): IUsersRepository => {
  const usersRepository = useContext(UsersRepositoryContext);

  if (!usersRepository)
    throw new Error(
      'useUsersRepository should only be used inside a UsersRepositoryContext',
    );

  return usersRepository;
};

export default useUsersRepository;
