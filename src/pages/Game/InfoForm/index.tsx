import React, { useState, useCallback } from 'react';

// Components
import ColorInput from '../../../components/ColorInput';
import ImageInput from '../../../components/ImageInput';

// Config
import { defaultTheme } from '../../../config/defaultTheme';

// Hooks
import { useGameData } from '../../../hooks/contexts/useGameData';
import { useTheme } from '../../../hooks/contexts/useTheme';

// Libraries
import { FaEdit } from 'react-icons/fa';
import { useFormik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Services
import { api } from '../../../services';

// Styles
import Button from '../../../styles/Button';
import { Form } from './styles';
import { ErrorField } from '../../../styles/Form';

// Types
import { InfoFormValues } from '../types';

// Utils
import handleApiErrors from '../../../utils/handleApiErrors';

const GameSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome do jogo.'),
  description: Yup.string().required(
    'Descreva melhor o jogo e seus objetivos.',
  ),
  theme: Yup.object(),
  image: Yup.mixed(),
});

const InfoForm: React.FC = () => {
  const { game, refreshGame } = useGameData();
  const { changeTheme } = useTheme();

  // Form management
  const initialValues: InfoFormValues = {
    name: game?.name || '',
    description: game?.description || '',
    theme: game?.theme || {
      primary: defaultTheme.primary,
      secondary: defaultTheme.secondary,
    },
    image: game?.image_url || null,
  };
  const [disabledBtn, setDisabledBtn] = useState(false);

  const submitForm = useCallback(
    async (values: FormikValues) => {
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

        await api.instance.put(`/game/${game._id}`, data);

        toast.success('Informações alteradas com sucesso.');

        await refreshGame();
      } catch (error) {
        handleApiErrors(error);
      }

      setDisabledBtn(false);
    },
    [game, refreshGame],
  );

  const { setValues, ...form } = useFormik({
    initialValues,
    validationSchema: GameSchema,
    onSubmit: submitForm,
  });

  const handleColorChange = useCallback(
    (key: string, color: string) => {
      const newTheme = {
        ...form.values.theme,
      };
      newTheme[key] = color;

      changeTheme(newTheme);
      form.setFieldValue('theme', newTheme);
    },
    [form, changeTheme],
  );

  if (!game) return null;

  return (
    <Form as="form" onSubmit={form.handleSubmit}>
      <div className="input-group image-group">
        <ImageInput
          name="image"
          value={form.values ? form.values.image : null}
          setInput={form.setFieldValue}
        >
          <button type="button">
            <FaEdit />
          </button>
        </ImageInput>
        {form.errors.image && form.touched.image ? (
          <ErrorField>{form.errors.image}</ErrorField>
        ) : null}
      </div>

      <div className="input-group">
        <input
          name="name"
          placeholder="Nome do jogo"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.name}
        />
        {form.errors.name && form.touched.name ? (
          <ErrorField>{form.errors.name}</ErrorField>
        ) : null}
      </div>

      <div className="input-group">
        <textarea
          name="description"
          placeholder="Descreva seu jogo"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.description}
        />
        {form.errors.description && form.touched.description ? (
          <ErrorField>{form.errors.description}</ErrorField>
        ) : null}
      </div>

      <div className="input-group">
        <h3>Tema</h3>

        <ColorInput
          label="Cor de fundo"
          value={form.values.theme.primary}
          onChange={color => handleColorChange('primary', color.hex)}
          onShowPanel={() => changeTheme(form.values.theme)}
          onHidePanel={() => changeTheme(game.theme)}
        />

        <ColorInput
          label="Cor dos botões"
          value={form.values.theme.secondary}
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
        </button>
      </div>

      <Button outline type="submit" disabled={disabledBtn}>
        Atualizar
      </Button>
    </Form>
  );
};

export default InfoForm;
