import React, { useState } from 'react';

// Contexts
import { useGame } from '../../../contexts/Game';

// Libs
import { FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Services
import api from '../../../services/api';

// Styles
import Button from '../../../styles/Button';
import { RemoveButton } from '../../../styles/RemoveButton';
import { LevelConfigContainer } from './styles';

// Utils
import {
  addItemToArray,
  removeItemFromArray,
  updateItemInArray,
} from '../../../utils/arrayMethods';

// Types
import { ILevelInfo } from '../types';

const LevelConfig: React.FC = () => {
  const { game, refreshGame } = useGame();
  const [disabledBtn, disableButton] = useState(false);
  const [levelInfo, setLevelInfo] = useState<ILevelInfo[]>(
    game.levelInfo.map(level => {
      return {
        requiredExperience: level.requiredExperience,
        title: level.title,
      };
    }),
  );

  const handleAddItem = () => {
    const newLevel = {
      requiredExperience: 0,
      title: '',
    };

    setLevelInfo(addItemToArray(levelInfo, newLevel));
  };

  const handleRemoveItem = (index: number) => {
    if (window.confirm('Deseja mesmo remover este nível?'))
      setLevelInfo(removeItemFromArray(levelInfo, index));
  };

  const handleChangeItem = (target: HTMLInputElement, index: number) => {
    const item = levelInfo[index];
    const selector = target.name;

    if (target.type === 'number') item[selector] = parseInt(target.value);
    else item[target.name] = target.value;

    setLevelInfo(updateItemInArray(levelInfo, item, index));
  };

  const handleSubmit = async () => {
    disableButton(true);

    const newLevelInfo = levelInfo.map((info, index) => {
      return {
        ...info,
        level: index + 1,
      };
    });

    try {
      await api.put(`/level/${game._id}`, { levelInfo: newLevelInfo });

      toast.success('Níveis alterados com sucesso.');

      await refreshGame();
    } catch (error) {
      console.error(error);
    }

    disableButton(false);
  };

  return (
    <LevelConfigContainer>
      <div>
        <h2>Configurar níveis</h2>
        <p>
          Ajuste quantos e quais níveis existem, se eles possuem algum nome
          específico, e quanto de experiência é necessário para atingí-lo a
          partir do nível anterior.
        </p>
        <div className="level-info-container">
          {levelInfo.map((info, index) => (
            <div className="info-item" key={`info-${index}`} tabIndex={1}>
              <RemoveButton
                type="button"
                title="Remover"
                onClick={() => handleRemoveItem(index)}
              >
                <FaTimes />
              </RemoveButton>
              <span className="level">Nível {index + 1}</span>
              <input
                type="number"
                placeholder="Experiência"
                className="experience"
                name="requiredExperience"
                value={info.requiredExperience}
                onChange={({ target }) => handleChangeItem(target, index)}
              />
              <input
                type="text"
                placeholder="Título do nível"
                className="title"
                name="title"
                value={info.title || ''}
                onChange={({ target }) => handleChangeItem(target, index)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddItem} className="add-item">
            <FaPlus />
          </button>
          <footer>
            <Button
              type="button"
              className="save"
              onClick={handleSubmit}
              disabled={disabledBtn}
            >
              Salvar
            </Button>
          </footer>
        </div>
      </div>
    </LevelConfigContainer>
  );
};

export default LevelConfig;
