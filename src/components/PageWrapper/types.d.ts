import { ReactNode } from 'react';

export interface PageWrapperProps {
  title: string;
  children: ReactNode;
}

export interface ReducingDivProps {
  reduced?: boolean;
}

export interface EditorProps {
  shown: boolean;
}
