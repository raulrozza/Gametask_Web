import { useCallback, useState } from 'react';
import useLogUserService from 'modules/landing/services/useLogUserService';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

interface UseLoginController {
  (): {
    loading: boolean;
    onSubmit: (values: IUserLoginDTO) => Promise<void>;
  };
}

const useLoginController: UseLoginController = () => {
  const [loading, setLoading] = useState(false);

  const loginService = useLogUserService();
  const session = useSessionContext();

  const onSubmit = useCallback(
    async (values: IUserLoginDTO) => {
      setLoading(true);

      const userId = await loginService.execute(values);

      if (!userId) return setLoading(false);

      return await session.login(userId);
    },
    [loginService, session],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useLoginController;
