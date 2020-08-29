import { AddArray, UpdateArray, RemoveArray } from './types';

export const addItemToArray: AddArray<any> = (array, item) => {
  return [...array, item];
};

export const updateItemInArray: UpdateArray<any> = (array, item, index) => {
  return [
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1, array.length),
  ];
};

export const removeItemFromArray: RemoveArray<any> = (array, index) => {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
};
