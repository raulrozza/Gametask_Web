import { errorCodesToToastIds } from 'config/errors';

export type ErrorCode = keyof typeof errorCodesToToastIds;
