import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Components
import { ImageInput } from 'components';

// Hooks
import { useApiPost } from 'hooks';

// Libs
import { Formik, Field } from 'formik';

// Schemas
import { GameSchema } from './schemas';

// Styles
import { Button, Form, ErrorField } from 'styles';
import { Container } from './styles';

// Types
import { IGameForm, IGameValues } from '../../types';

// Utils
import { displayErrorMessage } from 'utils';

const GameForm: React.FC<IGameForm> = ({ onSuccess, closeModal }) => {
  const [disabledButton, setDisabledButton] = useState(false);

  const apiPost = useApiPost();

  const initialValues: IGameValues = {
    name: '',
    description: '',
    image: null,
  };

  const onSubmit = useCallback(
    async values => {
      if (!values.image) {
        displayErrorMessage('Por favor, envie uma imagem!', 0);

        return;
      }

      setDisabledButton(true);

      const data = new FormData();

      data.append('name', values.name);
      data.append('description', values.description);
      data.append('image', values.image);

      const result = await apiPost(`/game`, data);

      if (result !== null) onSuccess();

      closeModal();
    },
    [apiPost, onSuccess, closeModal],
  );

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={GameSchema}
        onSubmit={onSubmit}
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
