import React, { useEffect, useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Form from '../../Form';
import ImageInput from '../../ImageInput';

// Components
import { FaEdit } from 'react-icons/fa';
import { useFormik, FormikValues, FormikErrors } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';

// Types
import { IAchievement, ITitle } from 'game';

import './styles.css';

const AchievementSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome da conquista.'),
  description: Yup.string().required('Explique como ganhar a conquista.'),
  title: Yup.string(),
  image: Yup.mixed(),
});

interface ISubmitProps {
  achievementId: string;
  type: 'create' | 'update';
}

export type ISubmit = (response: ISubmitProps) => void;

interface AchievementFormProps {
  achievement: IAchievement | null;
  submitCallback: ISubmit;
}

interface FormValues {
  name: string;
  description: string;
  title: string;
  image?: string | null;
}

const AchievementForm: React.FC<AchievementFormProps> = ({
  achievement,
  submitCallback,
}) => {
  // Form management
  const [title, setTitle] = useState<ITitle | null>(null);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const initialValues: FormValues = {
    name: '',
    description: '',
    title: '',
    image: null,
  };
  // Title suggestions
  const [titleList, setTitleList] = useState<ITitle[]>([]);
  const [showTitleList, setShowTitleList] = useState(false);
  const [overTitleList, setOverTitleList] = useState(false);

  // Sets the initial component configuration based on the received achievement and stored jwt token
  useEffect(() => {
    if (achievement) setTitle(achievement.title ? achievement.title : null);
  }, [achievement]);

  // OnChange method that changes the string in the title form, but also checks the API for existing titles
  // and adds them to a suggestion list
  const setTitleValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('title', value);
    try {
      const params = value.length > 0 ? { name: value } : {};
      api
        .get('/titles', {
          params,
        })
        .then(({ data }) => {
          setTitleList(data);
        });
      setTitle(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Method used on the suggestion list that adds a new title to the existing ones, while also adding it to the
  // selected title on the form.
  const addTitle = async (name: string) => {
    try {
      const response = await api.post('/title', {
        name,
      });
      setTitle(response.data);
      setShowTitleList(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Method varies dependending whether it is and update (if the achievement prop exists) or a new achievement
  // (if the prop doesn't exist). On submiting, summons the submitCallback to warn the parent about the changes
  const submitForm = async (values: FormikValues) => {
    const { name, description, image } = values;

    try {
      setDisabledBtn(true);

      const data = new FormData();

      if (achievement) {
        if (name !== achievement.name) data.append('name', name);
        if (description !== achievement.description)
          data.append('description', description);
        if (image !== achievement.image) data.append('image', image);
        data.append('title', title ? String(title._id) : '');

        const response = await api.put(`/achievement/${achievement._id}`, data);

        if (response.data.nModified > 0) {
          submitCallback({
            achievementId: achievement._id,
            type: 'update',
          });
        }
      } else {
        data.append('name', name);
        data.append('description', description);
        if (image) data.append('image', image);
        if (title) data.append('title', title._id);

        const response: { data: IAchievement } = await api.post(
          '/achievement',
          data,
        );

        submitCallback({
          achievementId: response.data._id,
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
    initialValues,
    validationSchema: AchievementSchema,
    validate: values => {
      const error = {} as FormikErrors<FormikValues>;
      if (values.title.length > 0 && !title) {
        error.title = 'Adicione um título existente.';
      }

      return error;
    },
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
      <Form onSubmit={form.handleSubmit}>
        <div className="form-group image-group">
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
            <div className="error-field">{form.errors.image}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Nome da conquista"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
          />
          {form.errors.name && form.touched.name ? (
            <div className="error-field">{form.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Como obter a conquista?"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.description}
          />
          {form.errors.description && form.touched.description ? (
            <div className="error-field">{form.errors.description}</div>
          ) : null}
        </div>
        <div
          className="form-group"
          onFocus={() => setShowTitleList(true)}
          onBlur={event => {
            form.handleBlur(event);
            if (!overTitleList) setShowTitleList(false);
          }}
          onMouseEnter={() => setOverTitleList(true)}
          onMouseLeave={() => setOverTitleList(false)}
        >
          <input
            type="text"
            name="title"
            placeholder="Sua conquista dará um título?"
            onChange={setTitleValue}
            value={form.values.title}
          />
          <div
            className="title-options"
            style={{ visibility: showTitleList ? 'visible' : 'hidden' }}
          >
            {titleList && titleList.length > 0 && (
              <ul>
                {titleList.map(title => (
                  <li
                    key={title._id}
                    onClick={() => {
                      setTitle(title);
                      form.setFieldValue('title', title.name);
                      setShowTitleList(false);
                    }}
                  >
                    {title.name}
                  </li>
                ))}
              </ul>
            )}
            {titleList && titleList.length === 0 && (
              <button type="button" onClick={() => addTitle(form.values.title)}>
                Adicionar título: {form.values.title}
              </button>
            )}
          </div>
          {form.errors.title && form.touched.title ? (
            <div className="error-field">{form.errors.title}</div>
          ) : null}
        </div>
        <button className="submit" type="submit" disabled={disabledBtn}>
          {achievement ? 'Atualizar' : 'Criar'}
        </button>
      </Form>
    </div>
  );
};

AchievementForm.propTypes = {
  achievement: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  submitCallback: PropTypes.func.isRequired,
};

export default AchievementForm;
