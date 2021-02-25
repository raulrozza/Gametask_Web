import React from 'react';
import { FaLink } from 'react-icons/fa';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import IGame from 'shared/entities/IGame';
import { Button } from 'shared/view/components';

import { Container } from './styles';

interface GameCardProps extends IGame {
  onShareClick: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  name,
  image_url,
  description,
  onShareClick,
}) => {
  const session = useSessionContext();

  return (
    <Container>
      <strong>{name}</strong>

      <img src={image_url} alt={name} />

      <span>{description}</span>

      <div>
        <Button outlined onClick={() => session.switchGame(id)}>
          Entrar
        </Button>

        <Button onClick={() => onShareClick(id)}>
          <FaLink />
        </Button>
      </div>
    </Container>
  );
};

export default GameCard;
