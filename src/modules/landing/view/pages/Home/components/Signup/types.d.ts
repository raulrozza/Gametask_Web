import { FormikHelpers } from 'formik';

export interface SignupFormValues {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type PasswordsError =
  | {
      confirmPassword: string;
    }
  | undefined;

export interface UseSignup {
  (): {
    buttonDisabled: boolean;
    onSubmit: (
      values: SignupFormValues,
      actions: FormikHelpers,
    ) => Promise<void>;
  };
}
