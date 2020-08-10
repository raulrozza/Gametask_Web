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
  const { game, getPlayerRank } = useGame();

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
          game.weeklyRanking.map(({ user, currentExperience }) => {
            const playerRank = getPlayerRank(user);

            return (
              <li key={user._id}>
                <div className="points">{currentExperience}</div>
                <div className="user">
                  <span
                    className="rank"
                    style={{
                      backgroundColor: playerRank.color,
                      color: getTextColor(playerRank.color),
                    }}
                    title={playerRank.name}
                  >
                    {playerRank.tag}
                  </span>
                  <span className="name">
                    {user.firstname}
                    {user.lastname ? ` ${user.lastname}` : ''}
                  </span>
                  {user.currentTitle && (
                    <span className="title">, {user.currentTitle.name}</span>
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
