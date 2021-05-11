import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { ContainerProps } from './styles';

interface RemoveButtonProps {
  horizontalPosition?: 'left' | 'right';
  title?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  horizontalPosition,
  title,
  onClick,
}) => (
  <ContainerProps
    title={title}
    horizontalPosition={horizontalPosition}
    onClick={onClick}
  >
    <FaTimes />
  </ContainerProps>
);

export default RemoveButton;
