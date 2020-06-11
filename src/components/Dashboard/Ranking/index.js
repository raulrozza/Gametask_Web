import React from 'react';

// Contexts
import { useGame } from '../../../contexts/Game';

// Loaders
import SkeletonLoader from "tiny-skeleton-loader-react";

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
          <>
            <li><div className="points"><SkeletonLoader background="var(--primary-shade)" /></div><div className="name"><SkeletonLoader background="var(--primary-shade)" /></div></li>
            <li><div className="points"><SkeletonLoader background="var(--primary-shade)" /></div><div className="name"><SkeletonLoader background="var(--primary-shade)" /></div></li>
            <li><div className="points"><SkeletonLoader background="var(--primary-shade)" /></div><div className="name"><SkeletonLoader background="var(--primary-shade)" /></div></li>
            <li><div className="points"><SkeletonLoader background="var(--primary-shade)" /></div><div className="name"><SkeletonLoader background="var(--primary-shade)" /></div></li>
            <li><div className="points"><SkeletonLoader background="var(--primary-shade)" /></div><div className="name"><SkeletonLoader background="var(--primary-shade)" /></div></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Ranking;
