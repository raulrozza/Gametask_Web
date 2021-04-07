import React, { useCallback } from 'react';

// Components
import { RemoveButton } from '..';
import { AddLevelButton } from './styles';

// Icons
import { FaPlus } from 'react-icons/fa';

// Types
import ILevelInfo from 'shared/entities/ILevelInfo';
import { FieldArrayRenderProps, FormikProps } from 'formik';

interface LevelsContainerProps extends FieldArrayRenderProps {
  form: FormikProps<{
    levels: ILevelInfo[];
  }>;
}

const LevelsContainer: React.FC<LevelsContainerProps> = ({
  form,
  push,
  handleRemove,
}) => {
  const handlePush = useCallback(() => {
    const newLevel: ILevelInfo = {
      level: 0,
      requiredExperience: 0,
    };

    push(newLevel);
  }, [push]);

  return (
    <>
      {form.values.levels.map((info, index) => (
        <div className="info-item" key={`info-${index}`}>
          <RemoveButton onClick={handleRemove(index)} />

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

      <AddLevelButton type="button" onClick={handlePush}>
        <FaPlus />
      </AddLevelButton>
    </>
  );
};

export default LevelsContainer;
