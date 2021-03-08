import React, { useCallback, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import AchievementSchema from 'modules/dashboard/validation/AchievementSchema';
import { Button, ImageInput, Input, Textarea } from 'shared/view/components';
import { TitleInput } from '..';
import useCreateAchievementController from 'modules/dashboard/infra/controllers/useCreateAchievementController';

import { ButtonContainer, Container, Form } from './styles';
import useEditAchievementController from 'modules/dashboard/infra/controllers/useEditAchievementController';

interface IFormValues {
  name: string;
  description: string;
  title: string;
  image?: string | File;
}

interface IAchievementInitialValues extends IFormValues {
  id: string;
  titleName: string;
}

const defaultInitialValues: IFormValues = {
  name: '',
  description: '',
  title: '',
  image: '',
};

interface AchievementEditorProps {
  visible: boolean;
  initialValues?: IAchievementInitialValues;
  closeEditor: () => void;
  updateAchievements: () => void;
}

const AchievementEditor: React.FC<AchievementEditorProps> = ({
  visible,
  initialValues,
  closeEditor,
  updateAchievements,
}) => {
  const {
    loading: loadingCreate,
    createAchievement,
  } = useCreateAchievementController();
  const {
    loading: loadingEdit,
    editAchievement,
  } = useEditAchievementController();

  const loading = loadingCreate || loadingEdit;

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const success = initialValues
        ? await editAchievement({ ...values, id: initialValues.id })
        : await createAchievement(values);

      if (success) {
        closeEditor();
        updateAchievements();
      }
    },
    [
      closeEditor,
      createAchievement,
      editAchievement,
      initialValues,
      updateAchievements,
    ],
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
