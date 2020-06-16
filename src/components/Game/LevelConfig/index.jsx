import React, { useState } from 'react';

// Contexts
import { useGame } from '../../../contexts/Game';

// Libs
import { FaPlus, FaTimes } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Utils
import { addItemToArray, removeItemFromArray, updateItemInArray } from '../../../utils/arrayMethods';

import './styles.css';

const LevelConfig = () => {
  const { game } = useGame();
  const [disabledBtn, disableButton] = useState(false);
  const [levelInfo, setLevelInfo] = useState(
    game.levelInfo.map(level => {
      return { requiredExperience: level.requiredExperience, title: level.title }
    })
  )

  const handleAddItem = () => {
    const newLevel = {
      requiredExperience: 0,
      title: "",
    };

    setLevelInfo(addItemToArray(levelInfo, newLevel));
  }

  const handleRemoveItem = (index) => {
    if(window.confirm("Deseja mesmo remover este nível?"));
      setLevelInfo(removeItemFromArray(levelInfo, index));
  }

  const handleChangeItem = (target, index) => {
    const item = levelInfo[index];
    if(target.type === "number")
      item[target.name] = parseInt(target.value);
    else
      item[target.name] = target.value;

    setLevelInfo(updateItemInArray(levelInfo, item, index));
  }

  const handleSubmit = async () => {
    disableButton(true);

    const newLevelInfo = levelInfo.map((info, index) => {
      return {
        ...info,
        level: index+1,
      }
    })

    try{
      await api.put(`/level/${game._id}`, { levelInfo: newLevelInfo });

      window.location.reload();
    } catch(error){
      console.error(error);
    }

    disableButton(false);
  }

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
            <div className="info-item" key={`info-${index}`} tabIndex={1}>
              <button type="button" className="delete-item" title="Remover" onClick={() => handleRemoveItem(index)}><FaTimes /></button>
              <span className="level" >Nível {index + 1}</span>
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
               value={info.title}
               onChange={({ target }) => handleChangeItem(target, index)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddItem} className="add-item">
            <FaPlus />
          </button>
          <footer>
            <button type="button" className="save" onClick={handleSubmit} disabled={disabledBtn} >Salvar</button>
          </footer>
        </div>
      </div>
    </section>
  )
}

export default LevelConfig;
