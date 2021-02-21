import { useCallback } from 'react';
import useUsersRepository from 'modules/landing/providers/UsersRepositoryProvider/contexts/useUsersRepository';
import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import IUser from 'modules/landing/entities/IUser';

interface UseSignUserService {
  execute(values: IUserSignupDTO): Promise<IUser>;
}

export default function useSignUserService(): UseSignUserService {
  const usersRepository = useUsersRepository();

  const execute = useCallback(
    async (values: IUserSignupDTO) => {
      const user = await usersRepository.create(values);

      return user;
    },
    [usersRepository],
  );

  return {
    execute,
  };
}
