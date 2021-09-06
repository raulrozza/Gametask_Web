import React from 'react';

import { Formik, Form } from 'formik';

import useCreateGameController from 'modules/user/infra/controllers/useCreateGameController';
import GameFormSchema, {
  requiredImageValidation,
} from 'modules/user/view/validation/GameFormSchema';
import { Button, ImageInput, Input, Textarea } from 'shared/view/components';

import { Container, Footer } from './styles';

interface IGameValues {
  name: string;
  description: string;
  image: string | File;
}

interface GameFormProps {
  onSuccess: () => Promise<void>;
  closeModal: () => void;
}

const initialValues: IGameValues = {
  name: '',
  description: '',
  image: '',
};

const GameForm: React.FC<GameFormProps> = ({ onSuccess, closeModal }) => {
  const { loading, onSubmit } = useCreateGameController({
    onSuccess,
    closeModal,
  });

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

              <Button type="submit" loading={loading}>
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
