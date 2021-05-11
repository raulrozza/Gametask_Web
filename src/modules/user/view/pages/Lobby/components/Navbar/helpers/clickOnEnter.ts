import { KeyboardEvent } from 'react';

const clickOnEnter = <T extends HTMLElement>(event: KeyboardEvent<T>): void => {
  if (event.key === 'Enter') {
    const target = event.target as T;

    target.click();
  }
};

export default clickOnEnter;
