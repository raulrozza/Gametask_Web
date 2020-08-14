import { ReactNode } from 'react';

export interface ImageInputProps {
  name: string;
  value?: string | File | null;
  setInput: (name: string, file: File | null) => void;
  children?: ReactNode;
}

export interface InputWrapperProps {
  thumbnail: string | null;
}
