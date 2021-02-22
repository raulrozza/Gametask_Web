import { useCallback } from 'react';
import useUsersRepository from 'modules/landing/providers/UsersRepositoryProvider/contexts/useUsersRepository';
import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import IUser from 'modules/landing/entities/IUser';
import useToastProvider from 'shared/container/providers/ToastProvider/contexts/useToastProvider';

interface UseSignUserService {
  execute(values: IUserSignupDTO): Promise<IUser | null>;
}

export default function useSignUserService(): UseSignUserService {
  const usersRepository = useUsersRepository();
  const toast = useToastProvider();

  const execute = useCallback(
    async (values: IUserSignupDTO) => {
      try {
        const user = await usersRepository.create(values);

        return user;
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
