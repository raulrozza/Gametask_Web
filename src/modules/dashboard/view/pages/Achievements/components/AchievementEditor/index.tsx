import React from 'react';
import { Formik } from 'formik';
import AchievementSchema from 'modules/dashboard/validation/AchievementSchema';
import { Button, ImageInput, Input, Textarea } from 'shared/view/components';

import { ButtonContainer, Container, Form } from './styles';

interface AchievementEditorProps {
  visible: boolean;
  closeEditor: () => void;
}

interface IFormValues {
  name: string;
  description: string;
  title: string;
  image?: string | File;
}

const initialValues: IFormValues = {
  name: '',
  description: '',
  title: '',
  image: '',
};

const AchievementEditor: React.FC<AchievementEditorProps> = ({ visible }) => {
  return (
    <Container $visible={visible}>
      <Formik
        initialValues={initialValues}
        validationSchema={AchievementSchema}
        onSubmit={console.log}
      >
        {() => (
          <Form>
            <ImageInput name="image" fullWidth />

            <Input name="name" placeholder="Nome da conquista" fullWidth />

            <Textarea
              name="description"
              placeholder="Descreva como obter esta conquista"
              fullWidth
            />

            <ButtonContainer>
              <Button type="submit">Enviar</Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AchievementEditor;
