import { AxiosError } from 'axios';
import apiCodes from 'config/errors/apiCodes';

interface IErrorResponseDetails {
  errorCode: number;
  message: string;
}

interface GetAxiosMessage {
  message: string;
  shouldLogout: boolean;
}

const isAxiosError = (error: Error | AxiosError): error is AxiosError =>
  (error as AxiosError).isAxiosError;

const getAxiosErrorMessage = (
  error: AxiosError<IErrorResponseDetails>,
): GetAxiosMessage => {
  const details = error.response?.data;
  const shouldLogout = error.response?.status === 403;

  if (!details) return { message: error.message, shouldLogout };

  const errorMessage = apiCodes[details.errorCode];

  if (!errorMessage) return { message: error.message, shouldLogout };

  return { message: errorMessage, shouldLogout };
};

export default class RequestError extends Error {
  public shouldLogout: boolean;

  constructor(error: Error | AxiosError) {
    if (isAxiosError(error)) {
      const { message, shouldLogout } = getAxiosErrorMessage(error);

      super(message);

      this.shouldLogout = shouldLogout;

      return;
    }

    super(error.message);
    this.shouldLogout = false;
  }
}
