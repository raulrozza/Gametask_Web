import React, { useEffect, useState, useCallback } from 'react';

// Components
import { useFormik, FormikValues } from 'formik';
import TitleInput from './TitleInput';
import ImageInput from '../../../components/ImageInput';

// Constants
import { initialValues } from './constants';

// Hooks
import { useApiPost } from '../../../hooks/api/useApiPost';
import { useApiPut } from '../../../hooks/api/useApiPut';

// Icons
import { FaEdit } from 'react-icons/fa';

// Schemas
import { AchievementSchema } from './schemas';

// Styles
import Button from '../../../styles/Button';
import { Form, ErrorField } from '../../../styles';

// Types
import { AchievementFormProps } from './types';
import { IAchievement } from '../../../interfaces/api/Achievement';
import { ITitle } from '../../../interfaces/api/Title';

// Utils
import { getAchievementFormData, validateFormTitle } from './utils';

const AchievementForm: React.FC<AchievementFormProps> = ({
  achievement,
  submitCallback,
}) => {
  // Form management
  const [title, setTitle] = useState<ITitle | null>(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  // Title suggestions
  const [showTitleList, setShowTitleList] = useState(false);
  const [overTitleList, setOverTitleList] = useState(false);

  const apiPost = useApiPost();
  const apiPut = useApiPut();

  useEffect(() => {
    if (achievement) setTitle(achievement?.title || null);
  }, [achievement]);

  const createAchievement = useCallback(
    async (values: FormikValues) => {
      const formValues = {
        ...values,
        title: title?._id,
      };

      const data = getAchievementFormData(formValues);

      const response = await apiPost('/achievement', data);

      if (response) submitCallback();
    },
    [apiPost, submitCallback, title],
  );

  const updateAchievement = useCallback(
    async (values: FormikValues, achievement: IAchievement) => {
      const formValues = {
        name: values.name !== achievement.name ? values.name : null,
        description:
          values.description !== achievement.description
            ? values.description
            : null,
        image: values.image !== achievement.image ? values.image : null,
      };

      const data = getAchievementFormData(formValues);

      data.append('title', title ? String(title._id) : '');

      await apiPut(`/achievement/${achievement._id}`, data);

      submitCallback();
    },
    [apiPut, submitCallback, title],
  );

  const submitForm = useCallback(
    async (values: FormikValues) => {
      setDisabledBtn(true);

      if (achievement) await updateAchievement(values, achievement);
      else await createAchievement(values);

      setDisabledBtn(false);
    },
    [achievement, updateAchievement, createAchievement],
  );

  const { setValues, resetForm, ...form } = useFormik({
    initialValues,
    validationSchema: AchievementSchema,
    validate: values => validateFormTitle(values, title),
    onSubmit: submitForm,
  });

  useEffect(() => {
    if (achievement) {
      setTitle(achievement.title ? achievement.title : null);

      setValues({
        name: achievement.name,
        description: achievement.description,
        title: achievement.title ? achievement.title.name : '',
        image: achievement.image,
      });
    } else resetForm();
  }, [setValues, resetForm, achievement]);

  return (
    <div className="achievement-form">
      <Form as="form" onSubmit={form.handleSubmit}>
        <div className="input-group image-group">
          <ImageInput
            name="image"
            value={form.values ? form.values.image : null}
            setInput={form.setFieldValue}
          >
            <button>
              <FaEdit />
            </button>
          </ImageInput>

          {form.errors.image && form.touched.image ? (
            <ErrorField>{form.errors.image}</ErrorField>
          ) : null}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Nome da conquista"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
          />

          {form.errors.name && form.touched.name ? (
            <ErrorField>{form.errors.name}</ErrorField>
          ) : null}
        </div>

        <div className="input-group">
          <textarea
            name="description"
            placeholder="Como obter a conquista?"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.description}
          />

          {form.errors.description && form.touched.description ? (
            <ErrorField>{form.errors.description}</ErrorField>
          ) : null}
        </div>

        <div
          className="input-group"
          onFocus={() => setShowTitleList(true)}
          onBlur={event => {
            form.handleBlur(event);
            if (!overTitleList) setShowTitleList(false);
          }}
          onMouseEnter={() => setOverTitleList(true)}
          onMouseLeave={() => setOverTitleList(false)}
        >
          <TitleInput
            setFormValue={title => form.setFieldValue('title', title)}
            setTitleState={setTitle}
            showOptions={showTitleList}
            setShowTitleList={setShowTitleList}
            inputValue={form.values.title}
          />

          {form.errors.title && form.touched.title ? (
            <ErrorField>{form.errors.title}</ErrorField>
          ) : null}
        </div>

        <Button outline type="submit" disabled={disabledBtn}>
          {achievement ? 'Atualizar' : 'Criar'}
        </Button>
      </Form>
    </div>
  );
};

export default AchievementForm;
