import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Assets
import placeholder from '../../assets/img/achievements/placeholder.png';

import './styles.css';

interface ImageInputProps {
  name: string;
  value?: string | File | null;
  setInput: (name: string, file: File | null) => void;
  children: React.ReactNode;
}

const ImageInput: React.FC<ImageInputProps> = ({
  name,
  value,
  setInput,
  children,
  ...props
}) => {
  const preview = useMemo(() => {
    if (typeof value === 'string') return value;
    return value ? URL.createObjectURL(value) : null;
  }, [value]);

  return (
    <label
      style={{ backgroundImage: `url(${preview})` }}
      className={`image-input ${value ? 'has-thumbnail' : ''}`}
      title="Selecione uma imagem!"
    >
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
    </label>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]),
  setInput: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ImageInput.defaultProps = {
  name: '',
  value: null,
};

export default ImageInput;
