// Hooks
import { useCallback, useState } from 'react';
import { useApiPost } from 'hooks';

// Utils
import { displaySuccessMessage } from 'utils';
import { passwordsDontMatch } from '../utils';

// Types
import { UseSignup } from '../types';

const useSignup: UseSignup = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const apiPost = useApiPost();

  const onSubmit = useCallback(
    async (values, actions) => {
      const passwordsError = passwordsDontMatch(values);
      if (passwordsError) return actions.setErrors(passwordsError);

      setButtonDisabled(true);

      const signupSuccessful = await apiPost('/user/signup', values);

      if (signupSuccessful)
        displaySuccessMessage('Cadastro efetuado com sucesso!');

      return setButtonDisabled(false);
    },
    [apiPost],
  );

  return {
    buttonDisabled,
    onSubmit,
  };
};

export default useSignup;