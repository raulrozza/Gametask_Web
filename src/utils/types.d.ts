export type AddItemToArray = <T>(array: T[], item: T) => T[];
export type UpdateItemInArray = <T>(array: T[], item: T, index: number) => T[];
export type RemoveItemFromArray = <T>(array: T[], index: number) => T[];

export type DisplayErrorMessage = (
  message: string,
  messageCode: number,
) => void;
