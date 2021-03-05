import React, { useCallback } from 'react';
import { Formik } from 'formik';
import AchievementSchema from 'modules/dashboard/validation/AchievementSchema';
import { Button, ImageInput, Input, Textarea } from 'shared/view/components';
import { TitleInput } from '..';
import useCreateAchievementController from 'modules/dashboard/infra/controllers/useCreateAchievementController';

import { ButtonContainer, Container, Form } from './styles';

interface IFormValues {
  name: string;
  description: string;
  title: string;
  image?: string | File;
}

const defaultInitialValues: IFormValues = {
  name: '',
  description: '',
  title: '',
  image: '',
};

interface AchievementEditorProps {
  visible: boolean;
  closeEditor: () => void;
  updateAchievements: () => void;
}

const AchievementEditor: React.FC<AchievementEditorProps> = ({
  visible,
  closeEditor,
  updateAchievements,
}) => {
  const { loading, createAchievement } = useCreateAchievementController();

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const success = await createAchievement(values);

      if (success) {
        closeEditor();
        updateAchievements();
      }
    },
    [closeEditor, createAchievement, updateAchievements],
  );

  return (
    <Container $visible={visible}>
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={AchievementSchema}
        onSubmit={handleSubmit}
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

            <TitleInput
              name="title"
              placeholder="Completar a conquista garante um título?"
              fullWidth
            />

            <ButtonContainer>
              <Button type="submit" loading={loading}>
                Enviar
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AchievementEditor;
