import React, { useState } from 'react';

import { ChromePicker } from 'react-color';

import './styles.css'

const ColorInput = ({ label, value, name, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mouseOnPicker, setMouseOnPicker] = useState(false);

  return (
    <div className="color-input">
      <label>{label}:</label>
      <div
        className="color-viewer"
        readOnly
        style={{ backgroundColor: `var(--${name})` }}
        onClick={() => {
          setShowPicker(true)
        }}
        onBlur={() => {
          if(!mouseOnPicker)
            setShowPicker(false)
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

export default ColorInput;
