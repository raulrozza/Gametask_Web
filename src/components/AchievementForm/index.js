import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Formik
import { useFormik } from 'formik';

// Yup
import * as Yup from 'yup';

import './styles.css';

const AchievementSchema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da conquista.'),
    description: Yup.string().required('Explique como ganhar a conquista.'),
    title: Yup.string(),
    image: Yup.mixed().required('Você precisa colocar uma foto.'),
});

const AchievementForm = ({ achievement }) => {
    const [title, setTitle] = useState({});

    const setTitleValue = ({ target: { value } }) => {
        form.setFieldValue('title', value);
    }

    const submitForm = async (values) => {
        console.log(values);
    }

    const { setValues, resetForm, ...form } = useFormik({
        initialValues: {
            name: "",
            description: "",
            title: "",
            image: null,
        },
        validationSchema: AchievementSchema,
        onSubmit: submitForm,
    });

    useEffect(() => {
        if(achievement){
            setValues({
                ...achievement,
                title: achievement.title ? achievement.title.name : ""
            })
        }
        else
            resetForm();
    }, [setValues, resetForm, achievement]);

    return (
        <div className="achievement-form">
            <form onSubmit={form.handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome da conquista"
                        onChange={form.handleChange}
                        value={form.values.name}
                    />
                    {form.errors.name && form.touched.name ? (
                        <div className="error-field">{form.errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="description"
                        placeholder="Como obter a conquista?"
                        onChange={form.handleChange}
                        value={form.values.description}
                    />
                    {form.errors.description && form.touched.description ? (
                        <div className="error-field">{form.errors.description}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder="Sua conquista dará um título?"
                        onChange={setTitleValue}
                        value={form.values.title}
                    />
                    {form.errors.title && form.touched.title ? (
                        <div className="error-field">{form.errors.title}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        name="image"
                        onChange={(event) => {
                            form.setFieldValue("file", event.currentTarget.files[0]);
                        }}
                    />
                    {form.errors.image && form.touched.image ? (
                        <div className="error-field">{form.errors.image}</div>
                    ) : null}
                </div>
                <button type="submit">{achievement ? "Atualizar" : "Criar"}</button>
            </form>
        </div>
    );
}

AchievementForm.propTypes = {
    achievement: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        }),
        image: PropTypes.string,
    })
}

AchievementForm.defaultProps = {
    achievement: null
}

export default AchievementForm;