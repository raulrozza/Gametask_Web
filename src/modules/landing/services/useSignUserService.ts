import { useCallback, useMemo } from 'react';
import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import IUser from 'modules/landing/entities/IUser';
import makeUsersRepository from 'modules/landing/providers/factories/makeUsersRepository';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseSignUserService {
  execute(values: IUserSignupDTO): Promise<IUser | null>;
}

export default function useSignUserService(): UseSignUserService {
  const usersRepository = useMemo(() => makeUsersRepository(), []);
  const toast = useToastContext();

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
