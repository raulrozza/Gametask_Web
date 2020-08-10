import React, { useEffect, useState } from 'react';

// Custom components
import Form from '../../Form';
import ColorInput from '../../ColorInput';
import ImageInput from '../../ImageInput';

// Contexts
import { useGame } from '../../../contexts/Game';

// Components
import { FaEdit } from 'react-icons/fa';
import { useFormik, FormikValues } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';

// Utils
import setTheme, { defaultTheme } from '../../../utils/setTheme';

import './styles.css';
import { IColorPallete } from 'theme';

const GameSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome do jogo.'),
  description: Yup.string().required(
    'Descreva melhor o jogo e seus objetivos.',
  ),
  theme: Yup.object(),
  image: Yup.mixed(),
});

interface FormValues {
  name: string;
  description: string;
  theme: IColorPallete;
  image: string | null;
}

const InfoForm: React.FC = () => {
  const { game } = useGame();

  // Form management
  const initialValues: FormValues = {
    name: '',
    description: '',
    theme: defaultTheme,
    image: null,
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
      if (theme !== game.theme) data.append('theme', JSON.stringify(theme));
      if (image !== game.image_url) data.append('image', image);

      await api.put(`/game/${game._id}`, data);

      window.location.reload();
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

  useEffect(() => {
    setValues({
      name: game.name ? game.name : '',
      description: game.description ? game.description : '',
      theme: game.theme ? game.theme : ({} as IColorPallete),
      image: game.image_url,
    });
  }, [setValues, game]);

  const handleColorChange = (key: string, color: string) => {
    const newTheme = {
      ...form.values.theme,
    };
    newTheme[key] = color;

    setTheme(newTheme);
    form.setFieldValue('theme', newTheme);
  };

  return (
    <Form onSubmit={form.handleSubmit}>
      <div className="form-group image-group">
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
          <div className="error-field">{form.errors.image}</div>
        ) : null}
      </div>
      <div className="form-group">
        <input
          name="name"
          placeholder="Nome do jogo"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.name}
        />
        {form.errors.name && form.touched.name ? (
          <div className="error-field">{form.errors.name}</div>
        ) : null}
      </div>
      <div className="form-group">
        <textarea
          name="description"
          placeholder="Descreva seu jogo"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.description}
        />
        {form.errors.description && form.touched.description ? (
          <div className="error-field">{form.errors.description}</div>
        ) : null}
      </div>
      <div className="form-group">
        <h3>Tema</h3>
        <ColorInput
          label="Cor de fundo"
          value={form.values.theme.primary}
          onChange={color => handleColorChange('primary', color.hex)}
          onShowPanel={() => setTheme(form.values.theme)}
          onHidePanel={() => setTheme(game.theme)}
        />
        <ColorInput
          label="Cor dos botões"
          value={form.values.theme.secondary}
          onChange={color => handleColorChange('secondary', color.hex)}
          onShowPanel={() => setTheme(form.values.theme)}
          onHidePanel={() => setTheme(game.theme)}
        />
        <button
          type="reset"
          onClick={() => {
            setTheme(defaultTheme);
            setValues({
              ...form.values,
              theme: defaultTheme,
            });
          }}
        >
          Restaurar tema padrão
        </button>
      </div>
      <button className="submit" type="submit" disabled={disabledBtn}>
        Atualizar
      </button>
    </Form>
  );
};

export default InfoForm;
