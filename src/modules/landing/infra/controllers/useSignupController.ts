import { useCallback, useState } from 'react';

import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import useSignUserService from 'modules/landing/services/useSignUserService';

interface UseSignupController {
  (): {
    loading: boolean;
    onSubmit: (values: IUserSignupDTO) => Promise<void>;
  };
}

const useSignupController: UseSignupController = () => {
  const [loading, setLoading] = useState(false);

  const signUserService = useSignUserService();

  const onSubmit = useCallback(
    async (values: IUserSignupDTO) => {
      setLoading(true);

      const signupSuccessful = await signUserService.execute(values);

      // TODO: Show success message

      setLoading(false);
    },
    [signUserService],
  );

  return {
    loading,
    onSubmit,
  };
};

export default useSignupController;
