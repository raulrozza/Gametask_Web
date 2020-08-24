import { ReactNode } from 'react';

export interface ModalProps {
  title?: string;
  closeModal?: () => void;
  children?: ReactNode;
  size?: 'md' | 'sm' | 'lg';
}

export interface ContainerProps {
  size: 'md' | 'sm' | 'lg';
}
