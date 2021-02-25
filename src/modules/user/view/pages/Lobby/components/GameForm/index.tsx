import React from 'react';

// Components
import { ImageInput } from 'components';

// Constants
import { initialValues } from './constants';

// Hooks
import { useCreateGame } from './hooks';

// Libs
import { Formik, Field } from 'formik';

// Schemas
import { GameSchema } from './schemas';

// Styles
import { Button, Form, ErrorField } from 'styles';
import { Container } from './styles';

// Types
import { IGameForm } from '../../types';

const GameForm: React.FC<IGameForm> = ({ onSuccess, closeModal }) => {
  const { loading, onSubmit } = useCreateGame({ onSuccess, closeModal });

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

              <Button type="submit" disabled={loading}>
                Criar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default GameForm;