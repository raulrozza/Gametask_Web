import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Form from '../../Form';

// Components
import { useFormik, FormikValues, FormikErrors } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';

// Types
import { IActivity } from 'game';

import './styles.css';

const ActivitySchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome da atividade.'),
  description: Yup.string(),
  dmRules: Yup.string(),
  experience: Yup.string().required('Quanto de experiência a atividade dá?'),
});

interface ISubmitProps {
  activityId: string;
  type: 'create' | 'update';
}

export type ISubmit = (response: ISubmitProps) => void;

interface ActivityFormProps {
  activity: IActivity | null;
  submitCallback: ISubmit;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  submitCallback,
}) => {
  // Form management
  const [disabledBtn, setDisabledBtn] = useState(false);

  // Method varies dependending whether it is and update (if the activity prop exists) or a new activity
  // (if the prop doesn't exist). On submiting, summons the submitCallback to warn the parent about the changes
  const submitForm = async (values: FormikValues) => {
    const { name, description, experience, dmRules } = values;

    try {
      setDisabledBtn(true);

      if (activity) {
        const response = await api.put(`/activity/${activity._id}`, {
          name,
          description,
          experience,
          dmRules,
        });

        if (response.data.nModified > 0) {
          submitCallback({
            activityId: activity._id,
            type: 'update',
          });
        }
      } else {
        const { data }: { data: IActivity } = await api.post('/activity', {
          name,
          description,
          experience: parseInt(experience),
          dmRules,
        });

        submitCallback({
          activityId: data._id,
          type: 'create',
        });
      }

      setDisabledBtn(false);
    } catch (error) {
      if (error.response) console.error(error.response.data);
      console.error(error);
    }
  };

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
    <div className="activity-form">
      <Form onSubmit={form.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Nome da atividade"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
          />
          {form.errors.name && form.touched.name ? (
            <div className="error-field">{form.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="experience"
            placeholder="A quantidade de experiência"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.experience}
          />
          {form.errors.experience && form.touched.experience ? (
            <div className="error-field">{form.errors.experience}</div>
          ) : null}
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Como pontuar?"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.description}
          />
          {form.errors.description && form.touched.description ? (
            <div className="error-field">{form.errors.description}</div>
          ) : null}
        </div>
        <div className="form-group">
          <textarea
            name="dmRules"
            placeholder="Existem regras especiais que os administradores devem levar em conta?"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.dmRules}
          />
          {form.errors.dmRules && form.touched.dmRules ? (
            <div className="error-field">{form.errors.dmRules}</div>
          ) : null}
        </div>
        <button className="submit" type="submit" disabled={disabledBtn}>
          {activity ? 'Atualizar' : 'Criar'}
        </button>
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