import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Formik
import { Formik, Field } from 'formik';

// Yup
import * as Yup from 'yup';

// Types
import { GameFormProps, GameFormValues } from '../types';

// Services
import api from '../../../services/api';

// Styles
import Button from '../../../styles/Button';
import Form, { ErrorField } from '../../../styles/Form';
import { Container } from './styles';
import ImageInput from '../../../components/ImageInput';

const GameSchema = Yup.object().shape({
  name: Yup.string().required('Dê um nome ao seu jogo.'),
  description: Yup.string().required('Descreva seu jogo.'),
  image: Yup.mixed(),
});

const GameForm: React.FC<GameFormProps> = ({ onSuccess, closeModal }) => {
  const [disabledButton, setDisabledButton] = useState(false);

  const initialValues: GameFormValues = {
    name: '',
    description: '',
    image: null,
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={GameSchema}
        onSubmit={async values => {
          if (!values.image) return;

          setDisabledButton(true);
          try {
            const data = new FormData();

            data.append('name', values.name);
            data.append('description', values.description);
            data.append('image', values.image);

            await api.post(`/game`, data);

            onSuccess();
          } catch (error) {
            console.error(error);
          } finally {
            closeModal();
          }
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="input-group image-group">
              <ImageInput
                name="image"
                value={values ? values.image : null}
                setInput={setFieldValue}
              />
              {errors.image && touched.image ? (
                <ErrorField>{errors.image}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Field type="text" name="name" placeholder="O nome do seu jogo" />
              {errors.name && touched.name ? (
                <ErrorField>{errors.name}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Field
                as="textarea"
                name="description"
                placeholder="Descreva seu jogo: o que ele representa? Onde será jogado? Quem participará?"
              />
              {errors.description && touched.description ? (
                <ErrorField>{errors.description}</ErrorField>
              ) : null}
            </div>

            <div className="input-group buttons">
              <Button outline onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit" disabled={disabledButton}>
                Criar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

GameForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default GameForm;
