import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChromePicker, ColorChangeHandler } from 'react-color';

import './styles.css';

interface ColorInputAttributes {
  label?: string;
  value?: string;
  onChange: ColorChangeHandler;
  onShowPanel?: () => void;
  onHidePanel?: () => void;
}

const ColorInput: React.FC<ColorInputAttributes> = ({
  label,
  value,
  onChange,
  onShowPanel,
  onHidePanel,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mouseOnPicker, setMouseOnPicker] = useState(false);

  return (
    <div className="color-input">
      {label && <label>{label}:</label>}
      <div
        className="color-viewer"
        style={{ backgroundColor: value }}
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
          className={`color-picker ${showPicker ? 'show' : ''}`}
          onMouseOver={() => setMouseOnPicker(true)}
          onMouseLeave={() => setMouseOnPicker(false)}
          tabIndex={1}
        >
          <ChromePicker disableAlpha color={value} onChange={onChange} />
        </div>
      </div>
    </div>
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
