// Hooks
import { useCallback, useState } from 'react';
import { useApiPost, useAuth } from 'hooks';

// Types
import { IUser } from 'interfaces';
import { UseLogin } from '../types';

const useLogin: UseLogin = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { signIn } = useAuth();
  const apiPost = useApiPost<IUser>();

  const onSubmit = useCallback(
    async values => {
      setButtonDisabled(true);

      const user = await apiPost('/login', values);

      if (!user) return setButtonDisabled(false);

      return signIn(user);
    },
    [signIn, apiPost],
  );

  return {
    buttonDisabled,
    onSubmit,
  };
};

export default useLogin;
