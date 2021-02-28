import React, { memo } from 'react';

// Assets
import placeholder from 'assets/img/games/placeholder.png';

// Components
import { Link } from 'react-router-dom';

// Hooks
import { useAuth, useGameData } from 'hooks';

// Icons
import { FaCog } from 'react-icons/fa';

// Styles
import { GameContainerDiv } from './styles';

const GameContainer: React.FC = () => {
  const { game, switchGame } = useGameData();
  const { user, signOut } = useAuth();

  if (!user || !game) return null;

  return (
    <GameContainerDiv>
      <div className="img-container">
        <picture>
          <source srcSet={game.image && game.image_url} />

          <img src={placeholder} alt={game.name} />
        </picture>
      </div>

      <div className="name">{game.name}</div>

      <div className="description">{game.description}</div>

      <button className="switch-game" onClick={() => switchGame()}>
        Ir para a seleção de jogos
      </button>

      <button className="logout" onClick={signOut}>
        Sair
      </button>

      <div className="user-info">
        Você está logado como <strong>{user.firstname}</strong>.
      </div>

      <button className="config-btn" type="button" title="Configurações">
        <Link to="/game">
          <FaCog />
        </Link>
      </button>
    </GameContainerDiv>
  );
};

export default memo(GameContainer);
