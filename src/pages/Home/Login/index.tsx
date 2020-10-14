import React, { useState, useCallback } from 'react';

// Components
import { Formik, Field } from 'formik';

// Hooks
import { useAuth } from '../../../hooks/contexts/useAuth';
import { useApiPost } from '../../../hooks/api/useApiPost';

// Schemas
import { LoginSchema } from './schemas';

// Styles
import { Form } from '../styles';
import Button from '../../../styles/Button';
import { ErrorField } from '../../../styles/Form';

// Types
import { FormContainerProps } from '../types';
import { IUser } from '../../../interfaces/api/User';

const Login: React.FC<FormContainerProps> = ({ shown }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  // States
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Hooks
  const { signIn } = useAuth();
  const apiPost = useApiPost<IUser>();

  const onSubmit = useCallback(
    async values => {
      setButtonDisabled(true);

      const user = await apiPost('/login', values);

      if (!user) return setButtonDisabled(false);

      return signIn(user);
    },
    [signIn, apiPost],
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
