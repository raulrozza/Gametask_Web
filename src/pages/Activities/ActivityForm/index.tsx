import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Components
import { useFormik, FormikValues, FormikErrors } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';

// Styles
import Button from '../../../styles/Button';
import Form, { ErrorField } from '../../../styles/Form';

// Types
import { ActivityFormProps } from '../types';

// Utils
import handleApiErrors from '../../../utils/handleApiErrors';

const ActivitySchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome da atividade.'),
  description: Yup.string(),
  dmRules: Yup.string(),
  experience: Yup.string().required('Quanto de experiência a atividade dá?'),
});

const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  submitCallback,
}) => {
  // Form management
  const [disabledBtn, setDisabledBtn] = useState(false);

  // Method varies dependending whether it is and update (if the activity prop exists) or a new activity
  // (if the prop doesn't exist). On submiting, summons the submitCallback to warn the parent about the changes
  const submitForm = useCallback(
    async (values: FormikValues) => {
      const { name, description, experience, dmRules } = values;

      setDisabledBtn(true);
      try {
        if (activity) {
          await api.put(`/activity/${activity._id}`, {
            name,
            description,
            experience,
            dmRules,
          });

          submitCallback(activity._id);
        } else {
          const { data } = await api.post('/activity', {
            name,
            description,
            experience: parseInt(experience),
            dmRules,
          });

          submitCallback(data._id);
        }
      } catch (error) {
        handleApiErrors(error);
      }

      setDisabledBtn(false);
    },
    [activity, submitCallback],
  );

  const { setValues, resetForm, ...form } = useFormik({
    initialValues: {
      name: '',
      description: '',
      dmRules: '',
      experience: '',
    },
    validationSchema: ActivitySchema,
    validate: values => {
      const error = {} as FormikErrors<FormikValues>;

      if (values.experience.length > 0 && isNaN(parseInt(values.experience))) {
        error.experience = 'Experiência tem que ser um número.';
      }

      return error;
    },
    onSubmit: submitForm,
  });

  useEffect(() => {
    if (activity) {
      setValues({
        name: activity.name,
        description: activity.description,
        dmRules: activity.dmRules || '',
        experience: String(activity.experience),
      });
    } else resetForm();
  }, [setValues, resetForm, activity]);

  return (
    <div>
      <Form as="form" onSubmit={form.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Nome da atividade"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
          />
          {form.errors.name && form.touched.name ? (
            <ErrorField>{form.errors.name}</ErrorField>
          ) : null}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="experience"
            placeholder="A quantidade de experiência"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.experience}
          />
          {form.errors.experience && form.touched.experience ? (
            <ErrorField>{form.errors.experience}</ErrorField>
          ) : null}
        </div>
        <div className="input-group">
          <textarea
            name="description"
            placeholder="Como pontuar?"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.description}
          />
          {form.errors.description && form.touched.description ? (
            <ErrorField>{form.errors.description}</ErrorField>
          ) : null}
        </div>
        <div className="input-group">
          <textarea
            name="dmRules"
            placeholder="Existem regras especiais que os administradores devem levar em conta?"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.dmRules}
          />
          {form.errors.dmRules && form.touched.dmRules ? (
            <ErrorField>{form.errors.dmRules}</ErrorField>
          ) : null}
        </div>
        <Button outline type="submit" disabled={disabledBtn}>
          {activity ? 'Atualizar' : 'Criar'}
        </Button>
      </Form>
    </div>
  );
};

ActivityForm.propTypes = {
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    dmRules: PropTypes.string.isRequired,
  }),
  submitCallback: PropTypes.func.isRequired,
};

export default ActivityForm;
