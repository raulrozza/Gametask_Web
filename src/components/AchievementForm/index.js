import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import ImageInput from '../ImageInput';

// Components
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

import './styles.css';

const AchievementSchema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da conquista.'),
    description: Yup.string().required('Explique como ganhar a conquista.'),
    title: Yup.string(),
    image: Yup.mixed().required('Você precisa colocar uma foto.'),
});

const AchievementForm = ({ achievement }) => {
    const [title, setTitle] = useState({});
    const [token, setToken] = useState(null);
    const [titleList, setTitleList] = useState(null);
    const [showTitleList, setShowTitleList] = useState(false);
    const [overTitleList, setOverTitleList] = useState(false);

    useEffect(() => {
        const userInfo = getToken();
        setToken(userInfo.token);
    }, []);

    const setTitleValue = ({ target: { value } }) => {
        form.setFieldValue('title', value);
        try{
            const params = value.length > 0 ? { name: value } : {};
            api.get('/titles', {
                headers: {
                    Authorization: 'Bearer '+token,
                },
                params
            })
            .then(({ data }) => {
                setTitleList(data);
            })
        }
        catch(error){
            console.error(error);
        }
    }

    const submitForm = async (values) => {
        console.log(values, title);
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
                    <ImageInput
                        name="image"
                        value={form.values ? form.values.image : null}
                        setInput={form.setFieldValue}
                    />
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
                    name="title"
                    className="form-group"
                    onFocus={() => setShowTitleList(true)}
                    onBlur={(event) => {
                        form.handleBlur(event);
                        if(!overTitleList)
                            setShowTitleList(false);
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
                    <div className="title-options" style={{ visibility: showTitleList ? "visible" : "hidden" }}>
                        {titleList && titleList.length > 0 && <ul>
                            {titleList.map(title => (
                                <li
                                    key={title._id}
                                    onClick={() => {
                                        setTitle(title);
                                        form.setFieldValue('title', title.name);
                                        setShowTitleList(false);
                                    }}
                                >{title.name}</li>
                            ))}
                        </ul>}
                        {titleList && titleList.length === 0 && <button>Adicionar título: {form.values.title}</button>}
                    </div>
                    {form.errors.title && form.touched.title ? (
                        <div className="error-field">{form.errors.title}</div>
                    ) : null}
                </div>
                <button className="submit" type="submit">{achievement ? "Atualizar" : "Criar"}</button>
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