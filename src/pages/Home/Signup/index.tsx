import React, { useState, useCallback } from 'react';

// Libs
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Services
import api from '../../../services/api';

// Styles
import Button from '../../../styles/Button';
import { ErrorField } from '../../../styles/Form';
import { Form } from '../styles';

// Types
import { FormContainerProps } from '../types';

// Utils
import handleErrors from '../../../utils/handleErrors';

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required('Digite seu nome'),
  lastname: Yup.string(),
  email: Yup.string().email('E-mail inválido').required('Digite um e-mail'),
  password: Yup.string().required('Digite uma senha'),
  confirmPassword: Yup.string().required('Repita sua senha'),
});

const Signup: React.FC<FormContainerProps> = ({ shown }) => {
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // States
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false);

  const onSubmit = useCallback(async (values, actions) => {
    if (values.password !== values.confirmPassword) {
      actions.setErrors({
        confirmPassword: 'As senhas não são iguais',
      });
      return;
    }
    setSignupButtonDisabled(true);

    // Post user in the API
    try {
      await api.post('/user/signup', values);

      toast.success('Cadastro efetuado com sucesso!');
    } catch (error) {
      handleErrors(error);
    }

    return setSignupButtonDisabled(false);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form shown={shown}>
          <h2>Cadastre-se</h2>

          <div className="form-group">
            <div className="input-group">
              <Field type="text" name="firstname" placeholder="Nome" />

              {errors.firstname && touched.firstname ? (
                <ErrorField>{errors.firstname}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Field type="text" name="lastname" placeholder="Sobrenome" />

              {errors.lastname && touched.lastname ? (
                <ErrorField>{errors.lastname}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Field type="email" name="email" placeholder="E-mail" />

              {errors.email && touched.email ? (
                <ErrorField>{errors.email}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Field type="password" name="password" placeholder="Senha" />

              {errors.password && touched.password ? (
                <ErrorField>{errors.password}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirme a senha"
              />

              {errors.confirmPassword && touched.confirmPassword ? (
                <ErrorField>{errors.confirmPassword}</ErrorField>
              ) : null}
            </div>

            <div className="input-group">
              <Button type="submit" disabled={signupButtonDisabled}>
                Cadastrar
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
