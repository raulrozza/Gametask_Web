import React, { memo, InputHTMLAttributes } from 'react';

// Components
import { ErrorField } from 'shared/view/components';

// Hooks
import { useField } from 'formik';

// Styles
import { Container, InputField } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  fullWidth = false,
  name,
  ...inputProps
}) => {
  const [field, meta] = useField(name);

  return (
    <Container $fullWidth={fullWidth}>
      <InputField {...field} {...inputProps} />

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    </Container>
  );
};

export default memo(Input);
