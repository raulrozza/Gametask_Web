import React from 'react';
import { FaEdit } from 'react-icons/fa';

import { Container } from './styles';

interface EditButtonProps {
  title?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

const EditButton: React.FC<EditButtonProps> = ({ title, onClick }) => (
  <Container>
    <FaEdit title={title} onClick={onClick} />
  </Container>
);

export default EditButton;
