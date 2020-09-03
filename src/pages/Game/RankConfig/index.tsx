import React, { useState } from 'react';

// Contexts
import { useGame } from '../../../contexts/Game';
import { getTextColor } from '../../../contexts/Theme';

// Libs
import { FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Services
import api from '../../../services/api';

// Utils
import {
  addItemToArray,
  removeItemFromArray,
  updateItemInArray,
} from '../../../utils/arrayMethods';

// Styles
import Button from '../../../styles/Button';
import { RemoveButton } from '../../../styles/RemoveButton';
import { RankConfigContainer, RankItem, ColorInput } from './styles';

// Types
import { IndexableRank } from '../types';

const RankConfig: React.FC = () => {
  const { game, refreshGame } = useGame();
  const [disabledBtn, disableButton] = useState(false);
  const [ranks, setRanks] = useState<IndexableRank[]>(
    game.ranks as IndexableRank[],
  );

  const handleAddItem = () => {
    const newLevel = {
      level: game.levelInfo[game.levelInfo.length - 1].level,
      tag: '',
      name: '',
      color: '',
    };

    setRanks(addItemToArray(ranks, newLevel));
  };

  const handleRemoveItem = (index: number) => {
    if (window.confirm('Deseja mesmo remover esta patente?'))
      setRanks(removeItemFromArray(ranks, index));
  };

  const handleSelectChange = (value: string, index: number) => {
    const item = ranks[index];
    item.level = parseInt(value);

    setRanks(
      updateItemInArray(ranks, item, index).sort((a, b) => a.level - b.level),
    );
  };

  const handleChangeItem = (target: HTMLInputElement, index: number) => {
    const item = ranks[index];
    item[target.name] = target.value;

    setRanks(updateItemInArray(ranks, item, index));
  };

  const handleColorChange = (color: string, index: number) => {
    const item = ranks[index];
    const newItem = {
      ...item,
      color,
    };

    setRanks(updateItemInArray(ranks, newItem, index));
  };

  const handleSubmit = async () => {
    disableButton(true);

    try {
      await api.put(`/rank/${game._id}`, { ranks });

      toast.success('Patente alterada com sucesso.');

      await refreshGame();
    } catch (error) {
      console.error(error);
    }

    disableButton(false);
  };

  return (
    <RankConfigContainer>
      <h2>Configurar patentes</h2>
      <p>
        Crie, edite e remova patentes. Defina uma cor e a partir de qual nível
        um jogador a obtém.
      </p>
      <div className="rank-container">
        {ranks.map((rank, index) => {
          const textColor = getTextColor(rank.color || game.theme.primary);

          return (
            <RankItem
              key={`${index}-${rank.level}`}
              backgroundColor={rank.color || 'transparent'}
              textColor={textColor}
            >
              <RemoveButton
                type="button"
                title="Remover"
                onClick={() => handleRemoveItem(index)}
              >
                <FaTimes />
              </RemoveButton>
              <div className="select">
                <label htmlFor="level">Nível: </label>

                <select
                  name="level"
                  value={rank.level}
                  onChange={({ target }) =>
                    handleSelectChange(target.value, index)
                  }
                >
                  {game.levelInfo.map(info => (
                    <option value={info.level} key={info.level}>
                      {info.level}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="Tag"
                className="tag"
                name="tag"
                value={rank.tag}
                onChange={({ target }) => handleChangeItem(target, index)}
              />

              <input
                type="text"
                placeholder="Nome da patente"
                className="name"
                name="name"
                value={rank.name}
                onChange={({ target }) => handleChangeItem(target, index)}
              />

              <ColorInput
                value={rank.color}
                onChange={color => handleColorChange(color.hex, index)}
              />
            </RankItem>
          );
        })}
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
    </RankConfigContainer>
  );
};

export default RankConfig;
