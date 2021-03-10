import React, { useCallback, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, Input, Textarea } from 'shared/view/components';
import ActivitySchema from 'modules/dashboard/validation/ActivitySchema';

import { ButtonContainer, Container, Form } from './styles';

interface IFormValues {
  name: string;
  experience: string;
  description?: string;
  dmRules?: string;
}

interface IActivityInitialValues extends IFormValues {
  id: string;
}

const defaultInitialValues: IFormValues = {
  name: '',
  description: '',
  dmRules: '',
  experience: '',
};

interface ActivityEditorProps {
  visible: boolean;
  initialValues?: IActivityInitialValues;
  closeEditor: () => void;
  updateActivities: () => void;
}

const ActivityEditor: React.FC<ActivityEditorProps> = ({
  visible,
  initialValues,
  closeEditor,
  updateActivities,
}) => {
  /* const {
    loading: loadingCreate,
    createAchievement,
  } = useCreateAchievementController();
  const {
    loading: loadingEdit,
    editAchievement,
  } = useEditAchievementController(); */

  const loading = false; // loadingCreate || loadingEdit;

  const handleSubmit = useCallback(
    async (values: IFormValues) => {
      const success = false; /* initialValues
        ? await editAchievement({ ...values, id: initialValues.id })
        : await createAchievement(values); */

      if (success) {
        closeEditor();
        updateActivities();
      }
    },
    [closeEditor, updateActivities],
  );

  const formik = useFormik({
    initialValues: defaultInitialValues,
    validationSchema: ActivitySchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!initialValues)
      formik.setValues({
        name: defaultInitialValues.name,
        description: defaultInitialValues.description,
        dmRules: defaultInitialValues.dmRules,
        experience: defaultInitialValues.experience,
      });
    else
      formik.setValues({
        name: initialValues.name,
        description: initialValues.description,
        dmRules: initialValues.dmRules,
        experience: initialValues.experience,
      });
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container $visible={visible}>
      <FormikProvider value={formik}>
        <Form>
          <Input name="name" placeholder="Nome da atividade" fullWidth />

          <Textarea
            name="description"
            placeholder="Descreva o que precisa ser feito para completar uma atividade deste tipo"
            fullWidth
          />

          <Input
            name="experience"
            placeholder="Quantidade de experiência"
            fullWidth
          />

          <Input
            name="dmRules"
            placeholder="Descreva regras específicas para que um usuário possa completar a atividade"
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

export default ActivityEditor;
