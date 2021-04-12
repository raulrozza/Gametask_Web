import { useField } from 'formik';
import React, { memo } from 'react';

import { Container, SSelect } from './styles';

interface SelectProps {
  index: number;
  options: Array<{
    key: string;
    value: number;
  }>;
}

const Select: React.FC<SelectProps> = ({ index, options }) => {
  const [field] = useField(`ranks[${index}].level`);

  return (
    <Container>
      <label htmlFor={`rank-${index}`}>Nível: </label>

      <SSelect id={`rank-${index}`} {...field}>
        {options.map(option => (
          <option value={option.value} key={option.key}>
            {option.key}
          </option>
        ))}
      </SSelect>
    </Container>
  );
};

export default memo(Select);
