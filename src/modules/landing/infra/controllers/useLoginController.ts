import { useCallback, useState } from 'react';
import useLogUserService from 'modules/landing/services/useLogUserService';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import useToastProvider from 'shared/container/providers/ToastProvider/contexts/useToastProvider';
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
  const toast = useToastProvider();
  const session = useSessionProvider();

  const onSubmit = useCallback(
    async (values: IUserLoginDTO) => {
      setLoading(true);

      const userId = await loginService.execute(values);

      if (!userId) {
        setLoading(false);

        return toast.showError('Usuário ou senha incorretos');
      }

      return session.login(userId);
    },
    [loginService, session, toast],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useLoginController;
