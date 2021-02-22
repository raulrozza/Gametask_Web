import { useCallback } from 'react';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import useUsersRepository from 'modules/landing/providers/UsersRepositoryProvider/contexts/useUsersRepository';
import useToastProvider from 'shared/container/providers/ToastProvider/contexts/useToastProvider';

interface UseLogUserService {
  execute(values: IUserLoginDTO): Promise<string | null>;
}

export default function useLogUserService(): UseLogUserService {
  const usersRepository = useUsersRepository();
  const toast = useToastProvider();

  const execute = useCallback(
    async ({ email, password }: IUserLoginDTO) => {
      try {
        const authentication = await usersRepository.validate({
          email,
          password,
        });

        return authentication.token;
      } catch (error) {
        toast.showError(error.message);

        return null;
      }
    },
    [toast, usersRepository],
  );

  return {
    execute,
  };
}
