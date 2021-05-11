import React from 'react';

// Icons
import { FaPlus } from 'react-icons/fa';

// Styles
import { Container } from './styles';

interface AddGameCardProps {
  onClick: () => void;
}

const AddGameCard: React.FC<AddGameCardProps> = ({ onClick }) => (
  <Container>
    <button type="button" onClick={onClick}>
      <FaPlus />

      <span>Criar Jogo</span>
    </button>
  </Container>
);

export default AddGameCard;
