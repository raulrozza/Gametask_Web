import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Custom components
import Form from '../../Form';
import ColorInput from '../../ColorInput';
import ImageInput from '../../ImageInput';

// Components
import { FaEdit } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';
import getToken from '../../../services/getToken';

// Utils
import setTheme from '../../../utils/setTheme';

import './styles.css';

const GameSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome do jogo.'),
  description: Yup.string().required('Descreva melhor o jogo e seus objetivos.'),
  theme: Yup.object(),
  image: Yup.mixed(),
});

const InfoForm = ({ game }) => {
  // Form management
  const [disabledBtn, setDisabledBtn] = useState(false);

  const submitForm = () => {
    console.log('opa')
  }

  const { setValues, ...form } = useFormik({
    initialValues: {
      name: "",
      description: "",
      theme: {},
      image: null,
    },
    validationSchema: GameSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    setValues({
      ...game,
      theme: game.theme ? game.theme : {},
      image: game.image_url
    });
    if(game)
      setTheme(game.theme);
  }, [setValues, game]);

  const handleColorChange = (key, color) => {
    let newTheme = {
      ...form.values.theme
    };
    newTheme[key] = color;

    setTheme(newTheme);
    form.setFieldValue('theme', newTheme);
  }

  return (
    <Form onSubmit={form.handleSubmit}>
        <div className="form-group image-group">
          <ImageInput
            name="image"
            value={form.values ? form.values.image : null}
            setInput={form.setFieldValue}
          >
          <button type="button"><FaEdit /></button>
          </ ImageInput>
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
            name="primary"
            value={form.values.theme.primary}
            onChange={color => handleColorChange('primary', color.hex)}
          />
          <ColorInput
            label="Cor dos botões"
            name="secondary"
            value={form.values.theme.secondary}
            onChange={color => handleColorChange('secondary', color.hex)}
          />
          <button type="reset" onClick={() => setTheme()}>Restaurar tema padrão</button>
        </div>
        <button className="submit" type="submit" disabled={disabledBtn}>
          Atualizar
        </button>
      </Form>
  )
};

InfoForm.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    theme: PropTypes.object,
    image_url: PropTypes.string
  })
}

export default InfoForm;
