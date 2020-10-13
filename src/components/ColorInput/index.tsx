import React, { useState } from 'react';

// Components
import { ChromePicker } from 'react-color';

// Types
import { ColorInputProps } from './types';

// Styles
import { ColorPicker, ColorViewer, Container } from './styles';

const ColorInput: React.FC<ColorInputProps> = ({
  label = '',
  value,
  className = '',
  onChange,
  onShowPanel = () => null,
  onHidePanel = () => null,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mouseOnPicker, setMouseOnPicker] = useState(false);

  return (
    <Container className={className}>
      {label && <label>{label}:</label>}

      <ColorViewer
        color={value || '#000'}
        onClick={() => {
          onShowPanel();
          setShowPicker(true);
        }}
        onBlur={() => {
          if (!mouseOnPicker) {
            setShowPicker(false);
            onHidePanel();
          }
        }}
        hasLabel={Boolean(label)}
        tabIndex={1}
        className="color-viewer"
      >
        <ColorPicker
          showPicker={showPicker}
          onMouseOver={() => setMouseOnPicker(true)}
          onMouseLeave={() => setMouseOnPicker(false)}
          tabIndex={1}
        >
          <ChromePicker
            disableAlpha
            color={value}
            onChangeComplete={onChange}
          />
        </ColorPicker>
      </ColorViewer>
    </Container>
  );
};

export default ColorInput;
