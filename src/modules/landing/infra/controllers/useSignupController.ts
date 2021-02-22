import { useCallback, useState } from 'react';

import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import useSignUserService from 'modules/landing/services/useSignUserService';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

interface Helpers {
  resetForm: () => void;
}

interface UseSignupController {
  (): {
    loading: boolean;
    onSubmit: (values: IUserSignupDTO, helpers: Helpers) => Promise<void>;
  };
}

const useSignupController: UseSignupController = () => {
  const [loading, setLoading] = useState(false);

  const signUserService = useSignUserService();
  const toast = useToastContext();

  const onSubmit = useCallback(
    async (values: IUserSignupDTO, helpers: Helpers) => {
      setLoading(true);

      const signupSuccessful = await signUserService.execute(values);

      if (signupSuccessful) {
        toast.showSuccess('Usuário criado com sucesso!');
        helpers.resetForm();
      }

      setLoading(false);
    },
    [signUserService, toast],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useSignupController;
