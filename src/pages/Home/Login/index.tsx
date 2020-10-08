import React, { useState, useCallback } from 'react';

// Hooks
import { useAuth } from '../../../hooks/contexts/useAuth';

// Libs
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api';

// Styles
import { Form } from '../styles';
import Button from '../../../styles/Button';
import { ErrorField } from '../../../styles/Form';

// Types
import { FormContainerProps } from '../types';

// Utils
import handleApiErrors from '../../../utils/handleApiErrors';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Digite seu email'),
  password: Yup.string().required('Digite sua senha'),
});

const Login: React.FC<FormContainerProps> = ({ shown }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  // States
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Hooks
  const { signIn } = useAuth();

  const onSubmit = useCallback(
    async values => {
      setButtonDisabled(true);

      // Login
      try {
        const response = await api.post('/login', values);

        return signIn(response.data);
      } catch (error) {
        handleApiErrors(error);
      }

      return setButtonDisabled(false);
    },
    [signIn],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form shown={shown}>
          <h2>Entre</h2>

          <div className="form-group">
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
              <Button type="submit" disabled={buttonDisabled}>
                Entrar
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
