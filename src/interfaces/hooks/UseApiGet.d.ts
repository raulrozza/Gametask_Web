import { AxiosRequestConfig } from 'axios';

export type ApiGet<T> = (
  URL: string,
  config?: AxiosRequestConfig,
) => Promise<T | null>;
