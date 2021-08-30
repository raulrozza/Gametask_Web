import React, { memo, useCallback } from 'react';

// Components
import { RemoveButton } from 'modules/gameManagement/view/components';
import { ExperienceInput, TitleInput } from '..';
import { AddLevelButton, LevelItem, LevelText } from './styles';

// Icons
import { FaPlus } from 'react-icons/fa';

// Types
import ILevelInfo from 'shared/domain/entities/ILevelInfo';
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
        <LevelItem key={`level-${index}`}>
          <RemoveButton onClick={handleRemove(index)} />

          <LevelText>Nível {index + 1}</LevelText>

          <ExperienceInput index={index} />

          <TitleInput index={index} />
        </LevelItem>
      ))}

      <AddLevelButton type="button" onClick={handlePush}>
        <FaPlus />
      </AddLevelButton>
    </>
  );
};

export default memo(LevelsContainer);
