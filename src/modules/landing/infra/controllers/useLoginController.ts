import { useCallback, useState } from 'react';
import useLogUserService from 'modules/landing/services/useLogUserService';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import useSessionProvider from 'shared/container/providers/SessionProvider/contexts/useSessionProvider';

interface UseLoginController {
  (): {
    loading: boolean;
    onSubmit: (values: IUserLoginDTO) => Promise<void>;
  };
}

const useLoginController: UseLoginController = () => {
  const [loading, setLoading] = useState(false);

  const loginService = useLogUserService();
  const session = useSessionProvider();

  const onSubmit = useCallback(
    async (values: IUserLoginDTO) => {
      setLoading(true);

      const userId = await loginService.execute(values);

      if (!userId) return setLoading(false);

      return session.login(userId);
    },
    [loginService, session],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useLoginController;
