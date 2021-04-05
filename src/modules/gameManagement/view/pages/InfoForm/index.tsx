import React, { useState, useCallback, useMemo } from 'react';

// Components
import { Button, ImageInput, Input, Textarea } from 'shared/view/components';
import ColorInput from 'components/ColorInput';
import { SForm } from './styles';

// Config
/* import { defaultTheme } from 'config/defaultTheme'; */

// Hooks
import useGetGameController from 'modules/gameManagement/infra/controller/useGetGameController';
/* import { useTheme } from 'hooks/contexts/useTheme'; */

// Libraries
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// Services
import { api } from 'services';

// Utils
import handleApiErrors from 'utils/handleApiErrors';

// Types
import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';

// Validation
import GameSchema from 'modules/gameManagement/view/validation/GameSchema';

interface IInitialValues {
  name: string;
  description: string;
  image: string;
  theme: {
    primary: string;
    secondary: string;
  };
}

const InfoForm: React.FC = () => {
  const { game, fetchGame } = useGetGameController();
  /* const { changeTheme } = useTheme(); */

  const initialValues: IInitialValues = useMemo(
    () => ({
      name: game.name,
      description: game.description,
      theme: game.theme,
      image: game.image_url || '',
    }),
    [game.description, game.image_url, game.name, game.theme],
  );
  const [disabledBtn, setDisabledBtn] = useState(false);

  const submitForm = useCallback(
    async (values: IUpdateGameDTO) => {
      const { name, description, theme, image } = values;
      setDisabledBtn(true);

      if (!game) return;

      try {
        const data = new FormData();

        if (name !== game.name) data.append('name', name);
        if (description !== game.description)
          data.append('description', description);
        if (
          theme.primary !== game.theme.primary ||
          theme.secondary !== game.theme.secondary
        )
          data.append('theme', JSON.stringify(theme));
        if (image !== game.image_url) data.append('image', image);

        await api.instance.put(`/game/${game.id}`, data);

        toast.success('Informações alteradas com sucesso.');

        fetchGame();
      } catch (error) {
        handleApiErrors(error);
      }

      setDisabledBtn(false);
    },
    [fetchGame, game],
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

        <div className="input-group">
          <h3>Tema</h3>

          {/* <ColorInput
          label="Cor de fundo"
          value={form.values.theme.palette.primary.contrast}
          onChange={color => handleColorChange('primary', color.hex)}
          onShowPanel={() => changeTheme(form.values.theme)}
          onHidePanel={() => changeTheme(game.theme)}
        />

        <ColorInput
          label="Cor dos botões"
          value={form.values.palette.secondary.main}
          onChange={color => handleColorChange('secondary', color.hex)}
          onShowPanel={() => changeTheme(form.values.theme)}
          onHidePanel={() => changeTheme(game.theme)}
        />

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
        </div>

        <Button outlined type="submit" disabled={disabledBtn}>
          Atualizar
        </Button>
      </SForm>
    </Formik>
  );
};

export default InfoForm;
