export type AddArray<T> = (array: T[], item: T) => T[];
export type UpdateArray<T> = (array: T[], item: T, index: number) => T[];
export type RemoveArray<T> = (array: T[], index: number) => T[];
