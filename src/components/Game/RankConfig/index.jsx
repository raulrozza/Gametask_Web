import React, { useState } from 'react';

// Contexts
import { useGame } from '../../../contexts/Game';

// Components
import ColorInput from '../../ColorInput';

// Libs
import { FaPlus, FaTimes } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Utils
import { addItemToArray, removeItemFromArray, updateItemInArray } from '../../../utils/arrayMethods';
import { getTextColor } from '../../../utils/setTheme';

import './styles.css';

const RankConfig = () => {
  const { game } = useGame();
  const [disabledBtn, disableButton] = useState(false);
  const [ranks, setRanks] = useState(game.ranks);

  const handleAddItem = () => {
    const newLevel = {
      level: game.levelInfo[game.levelInfo.length - 1].level,
      tag: "",
      name: "",
      color: "transparent",
    };

    setRanks(addItemToArray(ranks, newLevel));
  }

  const handleRemoveItem = (index) => {
    if(window.confirm("Deseja mesmo remover esta patente?"));
      setRanks(removeItemFromArray(ranks, index));
  }

  const handleSelectChange = (value, index) => {
    const item = ranks[index];
    item.level = parseInt(value);

    setRanks(
      updateItemInArray(ranks, item, index)
      .sort((a, b) => a.level - b.level)
    )
  }

  const handleChangeItem = (target, index) => {
    const item = ranks[index];
    item[target.name] = target.value;

    setRanks(updateItemInArray(ranks, item, index));
  }

  const handleColorChange = (color, index) => {
    const item = ranks[index];
    const newItem = {
      ...item,
      color,
    }

    setRanks(updateItemInArray(ranks, newItem, index));
  }

  const handleSubmit = async () => {
    disableButton(true);

    try{
      await api.put(`/rank/${game._id}`, { ranks });

      window.location.reload();
    } catch(error){
      console.error(error);
    }

    disableButton(false);
  }

  return (
    <section className="rank-config">
      <h2>Configurar patentes</h2>
      <p>
        Crie, edite e remova patentes. Defina uma cor e a partir de qual nível um jogador a obtém.
      </p>
      <div className="rank-container">
        {ranks.map((rank, index) => {
          const textColor = getTextColor(rank.color);

          return (
            <div className="item" key={`${index}-${rank.level}`} style={{ backgroundColor: rank.color, color: textColor }} >
              <div className="select">
                <button type="button" className="delete-item" title="Remover" onClick={() => handleRemoveItem(index)}><FaTimes /></button>
                <label htmlFor="level">Nível: </label>
                <select
                  name="level"
                  value={rank.level}
                  onChange={({ target }) =>
                    handleSelectChange(target.value, index)
                  }
                >
                  {game.levelInfo.map(info => (
                    <option value={info.level} key={info.level}>{info.level}</option>
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
                style={{ color: textColor }}
              />
              <input
                type="text"
                placeholder="Nome da patente"
                className="name"
                name="name"
                value={rank.name}
                onChange={({ target }) => handleChangeItem(target, index)}
                style={{ color: textColor }}
              />
              <ColorInput value={rank.color} onChange={color => handleColorChange(color.hex, index)} />
            </div>
          )
        })}
        <button type="button" onClick={handleAddItem} className="add-item">
          <FaPlus />
        </button>
        <footer>
          <button type="button" className="save" onClick={handleSubmit} disabled={disabledBtn} >Salvar</button>
        </footer>
      </div>
    </section>
  )
};

export default RankConfig;
