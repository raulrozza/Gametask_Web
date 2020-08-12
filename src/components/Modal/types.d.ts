export interface ModalProps {
  title?: string;
  closeModal?: () => void;
  children?: React.ReactNode;
  size?: 'md' | 'sm' | 'lg';
}

export interface ContainerProps {
  size: 'md' | 'sm' | 'lg';
}
