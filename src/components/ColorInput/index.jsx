import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChromePicker } from 'react-color';

import './styles.css';

const ColorInput = ({ label, value, onChange, onShowPanel, onHidePanel }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mouseOnPicker, setMouseOnPicker] = useState(false);

  return (
    <div className="color-input">
      <label>{label}:</label>
      <div
        className="color-viewer"
        readOnly
        style={{ backgroundColor: value }}
        onClick={() => {
          onShowPanel();
          setShowPicker(true);
        }}
        onBlur={() => {
          if(!mouseOnPicker){
            setShowPicker(false);
            onHidePanel();
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
          <ChromePicker
            disableAlpha
            color={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

ColorInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onShowPanel: PropTypes.func,
  onHidePanel: PropTypes.func,
}

ColorInput.defaultProps = {
  label: "",
  onChange: () => {},
  onShowPanel: () => {},
  onHidePanel: () => {},
}

export default ColorInput;
