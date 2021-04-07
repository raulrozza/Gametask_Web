import React, { useState, useCallback, useMemo } from 'react';

// Components
import {
  Button,
  ImageInput,
  Input,
  Loading,
  Textarea,
} from 'shared/view/components';
import { ColorInput } from 'modules/gameManagement/view/components';
import { ColorPreview, RestoreDefaultThemeButton } from './components';
import { ColorInputGroup, SForm } from './styles';

// Config
/* import { defaultTheme } from 'config/defaultTheme'; */

// Hooks
import useGetGameController from 'modules/gameManagement/infra/controller/useGetGameController';
import useThemeContext from 'shared/container/contexts/ThemeContext/contexts/useThemeContext';

// Libraries
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// Types
import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';

// Validation
import GameSchema from 'modules/gameManagement/view/validation/GameSchema';

interface IInitialValues {
  name: string;
  description: string;
  image: string;
  primary: string;
  secondary: string;
}

const InfoForm: React.FC = () => {
  const { loading, game, fetchGame } = useGetGameController();
  const { theme } = useThemeContext();

  const initialValues: IInitialValues = useMemo(
    () =>
      loading
        ? ({} as any)
        : {
            name: game.name,
            description: game.description,
            primary: theme.palette.primary.main,
            secondary: theme.palette.secondary.main,
            image: game.image_url || '',
          },
    [
      game.description,
      game.image_url,
      game.name,
      loading,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ],
  );
  const [disabledBtn, setDisabledBtn] = useState(false);

  const submitForm = useCallback(
    async ({
      name,
      description,
      primary,
      secondary,
      image,
    }: IUpdateGameDTO) => {
      setDisabledBtn(true);

      console.log(name, description, primary, secondary, image);

      /* const data = new FormData();

      if (name !== game.name) data.append('name', name);
      if (description !== game.description)
        data.append('description', description);
      if (primary !== game.theme.primary || secondary !== game.theme.secondary)
        data.append('theme', JSON.stringify({ primary, secondary }));
      if (image !== game.image_url) data.append('image', image); */

      /* await api.instance.put(`/game/${game.id}`, data); */

      toast.success('Informações alteradas com sucesso.');

      fetchGame();

      setDisabledBtn(false);
    },
    [fetchGame],
  );

  /* const handleColorChange = useCallback(
    (key: 'primary' | 'secondary', color: string) => {
      const newTheme = {
        ...form.values.theme,
      };
      newTheme[key] = color;

      /* changeTheme(newTheme);
      form.setFieldValue('theme', newTheme);
    },
    [form],
  ); */

  if (loading) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={GameSchema}
      onSubmit={submitForm}
    >
      <SForm>
        <ImageInput name="image" />

        <Input name="name" placeholder="Nome jogo" />

        <Textarea
          name="description"
          placeholder="Descreva seu jogo: o que ele representa? Onde será jogado? Quem participará?"
        />

        <ColorInputGroup>
          <h3>Tema</h3>

          <ColorInput name="primary" label="Cor de fundo" />

          <ColorInput name="secondary" label="Cor dos botões" />

          <ColorPreview />

          <RestoreDefaultThemeButton />

          {/*
        <button
          type="reset"
          onClick={() => {
            changeTheme(defaultTheme);
            setValues({
              ...form.values,
              theme: {
                primary: defaultTheme.primary,
                secondary: defaultTheme.secondary,
              },
            });
          }}
        >
          Restaurar tema padrão
        </button> */}
        </ColorInputGroup>

        <Button outlined type="submit" disabled={disabledBtn}>
          Atualizar
        </Button>
      </SForm>
    </Formik>
  );
};

export default InfoForm;
