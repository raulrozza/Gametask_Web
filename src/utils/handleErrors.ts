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

const isAxiosError = (error: any): error is AxiosError =>
  error.isAxiosError || false;

const handleErrors: (
  error: Error | AxiosError,
  signOut?: () => void,
) => void = (error, signOut) => {
  if (isAxiosError(error)) {
    const response = error.response;

    if (!response) return toast.error('Houve um problema de conexão.');

    switch (response.status) {
      case 403:
        toast.error('Você não tem permissão para acessar esta página.');
        if (signOut) return signOut();
        return;

      case 500:
        return toast.error('Não foi possível completar a requisição.');

      case 400:
        switch (response.data.code) {
          case 100:
            return toast.error('O usuário já existe');

          case 200:
            return toast.error('Usuário ou senha incorretos.');

          case 300:
            return toast.error('Dados ausentes na sua requisição.');

          default:
            return toast.error('Houve um erro com a requisição');
        }
      default:
        return toast.error('Houve um erro com a requisição');
    }
  } else toast.error('Ocorreu um erro.');
};

export default handleErrors;
