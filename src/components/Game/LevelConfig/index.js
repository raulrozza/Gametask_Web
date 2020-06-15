import React, { useState } from 'react';

import { useGame } from '../../../contexts/Game';
import { FaPlus, FaTimes } from 'react-icons/fa';

import './styles.css';

const LevelConfig = () => {
  const { game } = useGame();
  const [levelInfo, setLevelInfo] = useState(game.levelInfo)

  return (
    <section className="level-config">
      <div>
        <h2>Configurar níveis</h2>
        <p>
          Ajuste quantos e quais níveis existem, se eles possuem algum nome específico,
          e quanto de experiência é necessário para atingí-lo a partir do nível anterior.
        </p>
        <div className="level-info-container">
          {levelInfo.map((info, index) => (
            <div className="info-item" key={`info-${index}`}>
              <button type="button" className="delete-item" title="Remover"><FaTimes /></button>
              <input type="number" placeholder="Nível" className="level" value={info.level} />
              <input type="number" placeholder="Experiência" className="experience" value=
              {info.requiredExperience} />
              <input type="text" placeholder="Título" className="title" value={info.title} />
            </div>
          ))}
          <button type="button" className="add-item">
            <FaPlus />
          </button>
        </div>
      </div>
    </section>
  )
}

export default LevelConfig;
