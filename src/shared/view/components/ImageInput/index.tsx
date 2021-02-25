import React, { useCallback, useMemo } from 'react';

// Assets
import placeholder from 'assets/img/achievements/placeholder.png';

// Components
import { ErrorField } from 'shared/view/components';

// Hooks
import { useField } from 'formik';

// Styles
import { Container, Label, PlaceholderImage } from './styles';

interface ImageInputProps {
  name: string;
  fullWidth?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ name, fullWidth = false }) => {
  const [{ value, ...field }, meta, helpers] = useField(name);

  const preview = useMemo(() => {
    if (typeof value === 'string') return value;
    return value ? URL.createObjectURL(value) : null;
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];

      helpers.setValue(file);
    },
    [helpers],
  );

  return (
    <Container $fullWidth={fullWidth}>
      <Label thumbnail={preview} title="Selecione uma imagem!">
        <input type="file" {...field} onChange={handleChange} />

        <PlaceholderImage src={placeholder} alt="Select achievement icon" />
      </Label>

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    </Container>
  );
};

export default ImageInput;
