import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChromePicker } from 'react-color';

// Types
import { ColorInputProps } from './types';

// Styles
import { ColorInputWrapper } from './styles';

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  value,
  onChange,
  onShowPanel,
  onHidePanel,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mouseOnPicker, setMouseOnPicker] = useState(false);

  return (
    <ColorInputWrapper color={value || '#000'} showPicker={showPicker}>
      {label && <label>{label}:</label>}
      <div
        className="color-viewer"
        onClick={() => {
          if (onShowPanel) onShowPanel();
          setShowPicker(true);
        }}
        onBlur={() => {
          if (!mouseOnPicker) {
            setShowPicker(false);
            if (onHidePanel) onHidePanel();
          }
        }}
        tabIndex={1}
      >
        <div
          className={`color-picker`}
          onMouseOver={() => setMouseOnPicker(true)}
          onMouseLeave={() => setMouseOnPicker(false)}
          tabIndex={1}
        >
          <ChromePicker
            disableAlpha
            color={value}
            onChangeComplete={onChange}
          />
        </div>
      </div>
    </ColorInputWrapper>
  );
};

ColorInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onShowPanel: PropTypes.func,
  onHidePanel: PropTypes.func,
};

ColorInput.defaultProps = {
  label: '',
  onChange: () => {
    console.log('Not implemented.');
  },
};

export default ColorInput;
