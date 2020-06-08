import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import { FaCog } from 'react-icons/fa';

// Assets
import placeholder from '../../../assets/img/games/placeholder.png';

// Styles
import './styles.css';

const GameContainer = ({ game }) => {
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
      <button type="button">
        <Link to="/game"><FaCog /></Link>
      </button>
    </div>
  );
}

GameContainer.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    image_url: PropTypes.string,
    levelInfo: PropTypes.arrayOf(PropTypes.object),
    administrators: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.object,
  }).isRequired
}

export default GameContainer;
