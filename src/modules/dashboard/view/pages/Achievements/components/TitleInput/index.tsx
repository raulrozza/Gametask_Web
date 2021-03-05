import React, { InputHTMLAttributes, useCallback } from 'react';

// Components
import { ErrorField } from 'shared/view/components';

// Hooks
import { useField } from 'formik';
import useFilterTitlesByNameController from 'modules/dashboard/infra/controllers/useFilterTitlesByNameController';
import { useTitleOptionsController } from './hooks';

// Styles
import { AddTitleButton, Container, InputField, TitleOptions } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  fullWidth?: boolean;
}

const TitleInput: React.FC<InputProps> = ({
  fullWidth = false,
  name,
  ...inputProps
}) => {
  const [field, meta, helpers] = useField(name);

  const { titles, filterTitles } = useFilterTitlesByNameController();

  const titleOptions = useTitleOptionsController();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      filterTitles(value);

      field.onChange(event);
    },
    [field, filterTitles],
  );

  const handleFocus = useCallback(() => {
    titleOptions.show();

    helpers.setTouched(true);
  }, [helpers, titleOptions]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      titleOptions.hide();

      field.onBlur(event);
    },
    [field, titleOptions],
  );

  return (
    <Container $fullWidth={fullWidth}>
      <InputField
        {...field}
        {...inputProps}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}

      <TitleOptions visible={titleOptions.visible}>
        <AddTitleButton>Adicionar título: {field.value}</AddTitleButton>
      </TitleOptions>
    </Container>
  );
};

export default TitleInput;
