import React from 'react';

// Components
import { Button, ImageInput, Input, Textarea } from 'shared/view/components';

// Hooks
import { useCreateGame } from './hooks';

// Libs
import { Formik, Form } from 'formik';

// Schemas
import GameFormSchema, {
  requiredImageValidation,
} from 'modules/user/validation/GameFormSchema';

// Styles
import { Container, Footer } from './styles';

interface IGameValues {
  name: string;
  description: string;
  image: string | File | null;
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
        validate={requiredImageValidation}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <ImageInput name="image" />

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
