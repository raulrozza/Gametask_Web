import { RefObject } from 'react';

export interface ShareProps {
  gameId: string;
}

export interface UseShare {
  (props: { gameId: string }): {
    cipher: string;
    inputRef: RefObject<HTMLInputElement>;
    handleCopyToClipboard: () => void;
  };
}
