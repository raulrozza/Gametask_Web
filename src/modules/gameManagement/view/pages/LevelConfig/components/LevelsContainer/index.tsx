import React from 'react';

// Components
import { Button } from 'shared/view/components';
import { Container, AddLevelButton } from './styles';

// Hooks
import useLevelContext from 'modules/gameManagement/container/contexts/LevelContext/contexts/useLevelContext';

// Icons
import { FaPlus } from 'react-icons/fa';

// Types
import { RemoveButton } from 'modules/dashboard/view/components';

const LevelsContainer: React.FC = () => {
  const { levels, addLevel } = useLevelContext();

  return (
    <Container>
      {levels.map((info, index) => (
        <div className="info-item" key={`info-${index}`}>
          <RemoveButton onClick={() => undefined} />

          <span className="level">Nível {index + 1}</span>
          <input
            type="number"
            placeholder="Experiência"
            className="experience"
            name="requiredExperience"
            value={info.requiredExperience}
            /* onChange={({ target }) => handleChangeItem(target, index)} */
          />
          <input
            type="text"
            placeholder="Título do nível"
            className="title"
            name="title"
            value={info.title || ''}
            /* onChange={({ target }) => handleChangeItem(target, index)} */
          />
        </div>
      ))}

      <AddLevelButton type="button" onClick={addLevel}>
        <FaPlus />
      </AddLevelButton>

      <footer>
        <Button
          type="button"
          className="save"
          /* onClick={handleSubmit}
              disabled={disabledBtn} */
        >
          Salvar
        </Button>
      </footer>
    </Container>
  );
};

export default LevelsContainer;
