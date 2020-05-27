import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.css';

const GameContainer = ({ game, loading }) => {
    console.log(game, loading)

    return (
        <div className="info-box game-container">
            <div className="img-container">
                <img src={game.image_url} alt={game.name} />
            </div>
            <div className="name">{game.name}</div>
            <div className="description">{game.description}</div>
        </div>
    );
}

GameContainer.propTypes = {
    game: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        image_url: PropTypes.string,
        levelInfo: PropTypes.arrayOf(PropTypes.object),
        administrators: PropTypes.arrayOf(PropTypes.object),
        theme: PropTypes.object,
    }).isRequired
}

export default GameContainer;