import React, { TextareaHTMLAttributes } from 'react';

// Components
import { ErrorField } from 'shared/view/components';

// Hooks
import { useField } from 'formik';

// Styles
import { Container, TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  fullWidth?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  fullWidth = false,
  name,
  ...textareaProps
}) => {
  const [field, meta] = useField(name);

  return (
    <Container $fullWidth={fullWidth}>
      <TextareaField {...field} {...textareaProps} />

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    </Container>
  );
};

export default Textarea;
