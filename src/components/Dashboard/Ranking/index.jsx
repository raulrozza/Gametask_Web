import React from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { useGame } from '../../../contexts/Game';

import { FaFrown } from 'react-icons/fa';

// Styles
import './styles.css';

const Ranking = () => {
  const { game } = useGame();

  return (
    <div className="info-box ranking">
      <ul>
        <li className="list-title"><div className="points">Pontuação</div><div className="name">Jogador</div></li>
        {game.weeklyRanking.length > 0 ?
          game.weeklyRanking.map(item => (
            <li><div className="points">1000</div><div className="name">{item}</div></li>
          ))
        :   (
          <span>Ninguém pontuou ainda <FaFrown /> </span>
        )}
      </ul>
      <footer>
        <Link to="/players">Gerenciar Jogadores</Link>
      </footer>
    </div>
  );
}

export default Ranking;
