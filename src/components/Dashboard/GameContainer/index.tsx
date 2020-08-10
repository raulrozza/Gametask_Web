import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { FaCog } from 'react-icons/fa';

// Contexts
import { useGame } from '../../../contexts/Game';

// Assets
import placeholder from '../../../assets/img/games/placeholder.png';

// Styles
import './styles.css';

const GameContainer: React.FC = () => {
  const { game } = useGame();

  return (
    <div className="info-box game-container">
      <div className="img-container">
        <picture>
          <source srcSet={game.image && game.image_url} />
          <img src={placeholder} alt={game.name} />
        </picture>
      </div>
      <div className="name">{game.name}</div>
      <div className="description">{game.description}</div>
      <button type="button" title="Configurações">
        <Link to="/game">
          <FaCog />
        </Link>
      </button>
    </div>
  );
};

export default GameContainer;
