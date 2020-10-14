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
