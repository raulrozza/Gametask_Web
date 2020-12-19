import { toastMessages } from 'config/errors';

export interface IToastIds {
  [key: string]: keyof typeof toastMessages;
}
