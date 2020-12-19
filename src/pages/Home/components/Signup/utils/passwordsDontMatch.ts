// Types
import { SignupFormValues, PasswordsError } from '../types';

function passwordsDontMatch(values: SignupFormValues): PasswordsError {
  if (values.password !== values.confirmPassword)
    return {
      confirmPassword: 'As senhas não são iguais',
    };
}

export default passwordsDontMatch;
