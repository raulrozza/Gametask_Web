import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
  memo,
} from 'react';

// Components
import { ErrorField } from 'shared/view/components';

// Hooks
import { useField } from 'formik';
import useCreateTitleController from 'modules/dashboard/infra/controllers/useCreateTitleController';
import useFilterTitlesByNameController from 'modules/dashboard/infra/controllers/useFilterTitlesByNameController';
import { useTitleOptionsController } from './hooks';

// Styles
import {
  AddTitleButton,
  Container,
  InputField,
  OptionButton,
  TitleOptions,
} from './styles';
import ITitle from 'modules/dashboard/domain/entities/ITitle';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  initialValue?: string;
  fullWidth?: boolean;
}

const TitleInput: React.FC<InputProps> = ({
  fullWidth = false,
  name,
  initialValue,
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

  const handleSelectTitle = useCallback(
    (title: ITitle) => () => {
      helpers.setValue(title.id);

      titleOptions.hide(true);
      setTitleName(title.name);
    },
    [helpers, titleOptions],
  );

  useEffect(() => {
    if (initialValue) setTitleName(initialValue);
  }, [initialValue]);

  return (
    <Container
      $fullWidth={fullWidth}
      onFocus={titleOptions.show}
      onBlur={() => titleOptions.hide()}
    >
      <InputField
        {...field}
        {...inputProps}
        value={titleName}
        onChange={handleChange}
      />

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}

      <TitleOptions ref={titleOptions.menuRef} visible={titleOptions.visible}>
        {titles.map(title => (
          <OptionButton
            key={title.id}
            onClick={handleSelectTitle(title)}
            type="button"
          >
            {title.name}
          </OptionButton>
        ))}

        <AddTitleButton
          onClick={handleAddTitle}
          type="button"
          disabled={loading}
        >
          Criar novo {titleName}
        </AddTitleButton>
      </TitleOptions>
    </Container>
  );
};

export default memo(TitleInput);
