import {
  AddItemToArray,
  UpdateItemInArray,
  RemoveItemFromArray,
} from './types';

export const addItemToArray: AddItemToArray = (array, item) => {
  return [...array, item];
};

export const updateItemInArray: UpdateItemInArray = (array, item, index) => {
  if (index < 0) return array;

  return [
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1, array.length),
  ];
};

export const removeItemFromArray: RemoveItemFromArray = (array, index) => {
  if (index < 0) return array;

  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
};
