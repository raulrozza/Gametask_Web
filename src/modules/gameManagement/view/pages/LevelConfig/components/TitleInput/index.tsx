import { useField } from 'formik';
import React, { memo } from 'react';

// Components
import { Container } from './styles';

interface TitleInputProps {
  index: number;
}

const TitleInput: React.FC<TitleInputProps> = ({ index }) => {
  const [{ value, ...field }] = useField(`levels[${index}].title`);

  return (
    <Container
      type="text"
      placeholder="Título do nível"
      {...field}
      value={value || ''}
    />
  );
};

export default memo(TitleInput);
