import React, { useCallback, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
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
  initialValues?: IFormValues & { titleName: string };
  closeEditor: () => void;
  updateAchievements: () => void;
}

const AchievementEditor: React.FC<AchievementEditorProps> = ({
  visible,
  initialValues,
  closeEditor,
  updateAchievements,
}) => {
  const { loading, createAchievement } = useCreateAchievementController();

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const success = initialValues ? null : await createAchievement(values);

      if (success) {
        closeEditor();
        updateAchievements();
      }
    },
    [closeEditor, createAchievement, initialValues, updateAchievements],
  );

  const formik = useFormik({
    initialValues: defaultInitialValues,
    validationSchema: AchievementSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!initialValues)
      formik.setValues({
        name: defaultInitialValues.name,
        description: defaultInitialValues.description,
        title: defaultInitialValues.title,
        image: defaultInitialValues.image,
      });
    else
      formik.setValues({
        name: initialValues.name,
        description: initialValues.description,
        title: initialValues.title,
        image: initialValues.image,
      });
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container $visible={visible}>
      <FormikProvider value={formik}>
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
            initialValue={initialValues?.titleName}
            fullWidth
          />

          <ButtonContainer>
            <Button type="submit" loading={loading}>
              Enviar
            </Button>
          </ButtonContainer>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default AchievementEditor;
