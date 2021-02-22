import { useCallback } from 'react';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import useUsersRepository from 'modules/landing/providers/UsersRepositoryProvider/contexts/useUsersRepository';

interface UseLogUserService {
  execute(values: IUserLoginDTO): Promise<string>;
}

export default function useLogUserService(): UseLogUserService {
  const usersRepository = useUsersRepository();

  const execute = useCallback(
    async ({ email, password }: IUserLoginDTO) => {
      const authentication = await usersRepository.validate({
        email,
        password,
      });

      return authentication.token;
    },
    [usersRepository],
  );

  return {
    execute,
  };
}
