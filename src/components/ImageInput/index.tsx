import React, { useMemo, memo } from 'react';

// Assets
import placeholder from '../../assets/img/achievements/placeholder.png';

// Types
import { ImageInputProps } from './types';

// Stypes
import { InputWrapper } from './styles';

const ImageInput: React.FC<ImageInputProps> = ({
  name,
  value = null,
  setInput,
  children,
  ...props
}) => {
  const preview = useMemo(() => {
    if (typeof value === 'string') return value;
    return value ? URL.createObjectURL(value) : null;
  }, [value]);

  return (
    <InputWrapper thumbnail={preview} title="Selecione uma imagem!">
      <input
        type="file"
        name={name}
        onChange={event => {
          setInput(
            name,
            event.currentTarget.files && event.currentTarget.files[0],
          );
        }}
        {...props}
      />
      <img src={placeholder} alt="Select achievement icon" />
      {children}
    </InputWrapper>
  );
};

export default memo(ImageInput);
