import React, { memo } from 'react';
import { FaTimes } from 'react-icons/fa';

import { ContainerProps } from './styles';

interface RemoveButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => (
  <ContainerProps type="button" title="Remover" onClick={onClick}>
    <FaTimes />
  </ContainerProps>
);

export default memo(RemoveButton);
