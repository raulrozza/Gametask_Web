import React, { memo } from 'react';

// Assets
import placeholder from 'assets/img/games/placeholder.png';

// Components
import { Link } from 'react-router-dom';

// Hooks
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

// Icons
import { FaCog } from 'react-icons/fa';

// Styles
import {
  ConfigButton,
  Container,
  ImageContainer,
  InteractableOptions,
  LoggedInfoText,
} from './styles';

// Types
import IGame from 'shared/entities/IGame';

interface GameSummaryProps {
  game: IGame;
}

const GameSummary: React.FC<GameSummaryProps> = ({ game }) => {
  const session = useSessionContext();

  return (
    <Container>
      <ImageContainer>
        <picture>
          <source srcSet={game.image && game.image_url} />

          <img src={placeholder} alt={game.name} />
        </picture>
      </ImageContainer>

      <div className="name">{game.name}</div>

      <div className="description">{game.description}</div>

      <InteractableOptions onClick={() => session.switchGame()}>
        Ir para a seleção de jogos
      </InteractableOptions>

      <InteractableOptions onClick={() => session.logout()}>
        Sair
      </InteractableOptions>

      <LoggedInfoText>
        Você está logado como <strong>{session.userData.name}</strong>.
      </LoggedInfoText>

      <ConfigButton type="button" title="Configurações">
        <Link to="/settings">
          <FaCog />
        </Link>
      </ConfigButton>
    </Container>
  );
};

export default memo(GameSummary);
