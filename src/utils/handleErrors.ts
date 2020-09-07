import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

/*****
 * Errors mapping
 *
 * 100: User already exists
 * 101: Player already exists
 * 200: User and password don't match
 * 300: Missing parameters
 *
 * *****/

const toastIds = {
  UNKNOWN: 0,
  FORBIDDEN: 1,
  INTERNAL_ERROR: 2,
  USER_EXISTS: 3,
  USER_PASSWORD_DONT_MATCH: 4,
  MISSING_PARAMETERS: 5,
  DEFAULT_TOAST: 6,
  NO_DATA_RESPONSE: 7,
  UNABLE_TO_DELETE_TITLE: 8,
};

const isAxiosError = (error: any): error is AxiosError =>
  error.isAxiosError || false;

const handleErrors: (
  error: Error | AxiosError,
  signOut?: () => void,
) => void = (error, signOut) => {
  if (isAxiosError(error)) {
    const response = error.response;

    if (!response)
      return toast.error('Houve um problema de conexão.', {
        toastId: toastIds.NO_DATA_RESPONSE,
      });

    switch (response.status) {
      case 403:
        toast.error('Você não tem permissão para acessar esta página.', {
          toastId: toastIds.FORBIDDEN,
        });
        if (signOut) return signOut();
        return;

      case 500:
        return toast.error('Não foi possível completar a requisição.', {
          toastId: toastIds.INTERNAL_ERROR,
        });

      case 400:
        switch (response.data.code) {
          case 100:
            return toast.error('O usuário já existe', {
              toastId: toastIds.USER_EXISTS,
            });

          case 200:
            return toast.error('Usuário ou senha incorretos.', {
              toastId: toastIds.USER_PASSWORD_DONT_MATCH,
            });

          case 201:
            return toast.error('Não é possível excluir títulos já obtidos.', {
              toastId: toastIds.UNABLE_TO_DELETE_TITLE,
            });

          case 300:
            return toast.error('Dados ausentes na sua requisição.', {
              toastId: toastIds.MISSING_PARAMETERS,
            });

          default:
            return toast.error('Houve um erro com a requisição', {
              toastId: toastIds.DEFAULT_TOAST,
            });
        }
      default:
        return toast.error('Houve um erro com a requisição', {
          toastId: toastIds.DEFAULT_TOAST,
        });
    }
  } else toast.error('Ocorreu um erro.', { toastId: toastIds.UNKNOWN });
};

export default handleErrors;
