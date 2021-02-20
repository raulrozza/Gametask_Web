export interface UseLogin {
  (): {
    buttonDisabled: boolean;
    onSubmit: (values: unknown) => Promise<void>;
  };
}
