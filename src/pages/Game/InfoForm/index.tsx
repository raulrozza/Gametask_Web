import React, { useState } from 'react';

// Components
import ColorInput from '../../../components/ColorInput';
import ImageInput from '../../../components/ImageInput';

// Contexts
import { useGame } from '../../../contexts/Game';

// Libraries
import { FaEdit } from 'react-icons/fa';
import { useFormik, FormikValues } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';

// Types
import { InfoFormValues } from '../types';

// Styles
import Button from '../../../styles/Button';
import { Form } from './styles';
import { useTheme, defaultTheme } from '../../../contexts/Theme';
import { ErrorField } from '../../../styles/Form';

const GameSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome do jogo.'),
  description: Yup.string().required(
    'Descreva melhor o jogo e seus objetivos.',
  ),
  theme: Yup.object(),
  image: Yup.mixed(),
});

const InfoForm: React.FC = () => {
  const { game, refreshGame } = useGame();
  const { changeTheme } = useTheme();

  // Form management
  const initialValues: InfoFormValues = {
    name: game.name ? game.name : '',
    description: game.description ? game.description : '',
    theme: game.theme
      ? game.theme
      : { primary: defaultTheme.primary, secondary: defaultTheme.secondary },
    image: game.image_url,
  };
  const [disabledBtn, setDisabledBtn] = useState(false);

  const submitForm = async (values: FormikValues) => {
    const { name, description, theme, image } = values;
    setDisabledBtn(true);

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

      await api.put(`/game/${game._id}`, data);

      await refreshGame();
    } catch (error) {
      if (error.response) console.error(error.response.data);
      console.error(error);
    }

    setDisabledBtn(false);
  };

  const { setValues, ...form } = useFormik({
    initialValues,
    validationSchema: GameSchema,
    onSubmit: submitForm,
  });

  const handleColorChange = (key: string, color: string) => {
    const newTheme = {
      ...form.values.theme,
    };
    newTheme[key] = color;

    changeTheme(newTheme);
    form.setFieldValue('theme', newTheme);
  };

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
              theme: defaultTheme,
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