import React from 'react';

// Components
import { Button, Input, Textarea } from 'shared/view/components';
import { ImageInput } from 'components';

// Hooks
import { useCreateGame } from './hooks';

// Libs
import { Formik, Form } from 'formik';

// Schemas
import GameFormSchema from 'modules/user/validators/GameFormSchema';

// Styles
import { ErrorField } from 'styles';
import { Container, Footer } from './styles';

interface IGameValues {
  name: string;
  description: string;
  image: string | null;
}

interface GameFormProps {
  onSuccess: () => Promise<void>;
  closeModal: () => void;
}

const initialValues: IGameValues = {
  name: '',
  description: '',
  image: null,
};

const GameForm: React.FC<GameFormProps> = ({ onSuccess, closeModal }) => {
  const { loading, onSubmit } = useCreateGame({ onSuccess, closeModal });

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={GameFormSchema}
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

            <Input name="name" placeholder="O nome do seu jogo" />

            <Textarea
              name="description"
              placeholder="Descreva seu jogo: o que ele representa? Onde será jogado? Quem participará?"
            />

            <Footer>
              <Button outlined onClick={closeModal}>
                Cancelar
              </Button>

              <Button type="submit" disabled={loading}>
                Criar
              </Button>
            </Footer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default GameForm;
