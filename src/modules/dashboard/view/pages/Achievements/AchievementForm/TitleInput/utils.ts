import { TitleParams } from './types';

export const getTitleParams = (value: string): TitleParams => {
  const params: TitleParams = {};

  if (value.length > 0) params.name = value;

  return params;
};
