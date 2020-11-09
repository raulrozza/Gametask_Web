// Types
import { SignupFormValues, PasswordsError } from './types';

export function passwordsDontMatch(values: SignupFormValues): PasswordsError {
  if (values.password !== values.confirmPassword) {
    return {
      confirmPassword: 'As senhas não são iguais',
    };
  }
}
