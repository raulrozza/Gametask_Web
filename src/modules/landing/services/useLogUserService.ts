import { useCallback, useMemo } from 'react';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import makeUsersRepository from 'modules/factories/makeUsersRepository';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface UseLogUserService {
  execute(values: IUserLoginDTO): Promise<string | null>;
}

export default function useLogUserService(): UseLogUserService {
  const usersRepository = useMemo(() => makeUsersRepository(), []);
  const toast = useToastContext();

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
