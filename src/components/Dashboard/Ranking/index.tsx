import React from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { useGame } from '../../../contexts/Game';

import { FaFrown } from 'react-icons/fa';

// Utils
import { getTextColor } from '../../../utils/setTheme';

// Styles
import './styles.css';

const Ranking: React.FC = () => {
  const { game } = useGame();

  return (
    <div className="info-box ranking">
      <ul>
        <li className="list-title">
          <div className="points">Pontuação</div>
          <div className="user">Jogador</div>
          {game.newRegisters > 0 && (
            <div
              className="registers-box"
              title="Novas requisições de pontuação."
            >
              {game.newRegisters}
            </div>
          )}
        </li>
        {game.weeklyRanking.length > 0 ? (
          game.weeklyRanking.map(({ player, currentExperience }) => {
            return (
              <li key={player._id}>
                <div className="points">{currentExperience}</div>
                <div className="user">
                  <span
                    className="rank"
                    style={{
                      backgroundColor: player.rank.color,
                      color: getTextColor(player.rank.color),
                    }}
                    title={player.rank.name}
                  >
                    {player.rank.tag}
                  </span>
                  <span className="name">
                    {player.user.firstname}
                    {player.user.lastname ? ` ${player.user.lastname}` : ''}
                  </span>
                  {player.currentTitle && (
                    <span className="title">, {player.currentTitle.name}</span>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <span>
            Ninguém pontuou ainda <FaFrown />{' '}
          </span>
        )}
      </ul>
      <footer>
        <Link to="/players">Gerenciar Jogadores</Link>
      </footer>
    </div>
  );
};

export default Ranking;
