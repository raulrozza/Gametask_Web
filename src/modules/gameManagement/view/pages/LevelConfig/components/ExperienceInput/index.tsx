import { useField } from 'formik';
import React, { memo } from 'react';

// Components
import { Container } from './styles';

interface ExperienceInputProps {
  index: number;
}

const ExperienceInput: React.FC<ExperienceInputProps> = ({ index }) => {
  const [field] = useField(`levels[${index}].requiredExperience`);

  return <Container type="number" placeholder="Experiência" {...field} />;
};

export default memo(ExperienceInput);
