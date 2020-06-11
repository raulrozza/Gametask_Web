import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Assets
import placeholder from '../../assets/img/achievements/placeholder.png';

import './styles.css';

const ImageInput = ({ name, value, setInput, children, ...props }) => {
  const preview = useMemo(() => {
    if(typeof(value) === "string")
      return value;
    return value ? URL.createObjectURL(value) : null;
  }, [value])

  return (
    <label
      style={{ backgroundImage: `url(${preview})` }}
      className={`image-input ${value ? 'has-thumbnail' : ''}`}
      title="Selecione uma imagem!"
    >
      <input
        type="file"
        name={name}
        onChange={(event) => {
          setInput(name, event.currentTarget.files[0]);
        }}
        {...props}
      />
      <img src={placeholder} alt="Select achievement icon" />
      {children}
    </label>
  );
}

ImageInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  setInput: PropTypes.func,
  children: PropTypes.node,
}

ImageInput.defaultProps = {
  name: "",
  value: null,
  setInput: () => {},
}

export default ImageInput;
