import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

// Components
import { ChromePicker, ColorChangeHandler } from 'react-color';

// Hooks
import { useField } from 'formik';

// Styles
import { ColorPicker, ColorViewer, Container } from './styles';

interface ColorInputProps {
  name: string;
  label?: string;
  className?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({
  name,
  label = '',
  className,
}) => {
  const [field, , helpers] = useField(name);

  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  const [mouseOverPicker, setMouseOverPicker] = useState(false);

  useEffect(() => {
    if (pickerRef.current) {
      pickerRef.current.addEventListener('mouseenter', () =>
        setMouseOverPicker(true),
      );

      pickerRef.current.addEventListener('mouseleave', () =>
        setMouseOverPicker(false),
      );
    }

    const body = document.querySelector('body');

    const listener = () => {
      if (mouseOverPicker) return;

      setShowPicker(false);
    };

    if (body) body.addEventListener('click', listener);

    return () => {
      if (body) body.removeEventListener('click', listener);
    };
  });

  const handleViewerClick = useCallback(() => {
    if (mouseOverPicker) return;

    setShowPicker(show => !show);
  }, [mouseOverPicker]);

  const handleViewerBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!mouseOverPicker) {
        setShowPicker(false);
        field.onBlur(event);
      }
    },
    [field, mouseOverPicker],
  );

  const handleChange = useCallback<ColorChangeHandler>(
    color => helpers.setValue(color.hex),
    [helpers],
  );

  return (
    <Container className={className}>
      {label && <label htmlFor={`${name}-color`}>{label}:</label>}

      <ColorViewer
        id={`${name}-color`}
        color={field.value}
        onClick={handleViewerClick}
        onBlur={handleViewerBlur}
        hasLabel={Boolean(label)}
        className="color-viewer"
      >
        <ColorPicker showPicker={showPicker} ref={pickerRef}>
          <ChromePicker
            disableAlpha
            color={field.value}
            onChange={handleChange}
          />
        </ColorPicker>
      </ColorViewer>
    </Container>
  );
};

export default memo(ColorInput);
