import React, { InputHTMLAttributes, useCallback, useState } from 'react';

// Components
import { ErrorField } from 'shared/view/components';

// Hooks
import { useField } from 'formik';
import useCreateTitleController from 'modules/dashboard/infra/controllers/useCreateTitleController';
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

  const [titleName, setTitleName] = useState('');

  const { titles, filterTitles } = useFilterTitlesByNameController();
  const { loading, createTitle } = useCreateTitleController();

  const titleOptions = useTitleOptionsController();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      filterTitles(value);

      setTitleName(value);
    },
    [filterTitles],
  );

  const handleAddTitle = useCallback(async () => {
    const title = await createTitle({ name: titleName });

    if (title) helpers.setValue(title.id);

    titleOptions.hide();
  }, [createTitle, helpers, titleName, titleOptions]);

  return (
    <Container
      $fullWidth={fullWidth}
      onFocus={titleOptions.show}
      onBlur={titleOptions.hide}
    >
      <InputField
        {...field}
        {...inputProps}
        value={titleName}
        onChange={handleChange}
      />

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}

      <TitleOptions ref={titleOptions.menuRef} visible={titleOptions.visible}>
        <AddTitleButton
          onClick={handleAddTitle}
          type="button"
          disabled={loading}
        >
          Adicionar título: {titleName}
        </AddTitleButton>
      </TitleOptions>
    </Container>
  );
};

export default TitleInput;
