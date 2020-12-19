import React from 'react';

// Components
import { Formik, Field } from 'formik';

// Constants
import { initialValues } from './constants';

// Hooks
import { useLogin } from './hooks';

// Schemas
import { LoginSchema } from './schemas';

// Styles
import { Button, ErrorField } from 'styles';
import { Form } from '../../styles';

// Types
import { FormContainerProps } from '../../types';

const Login: React.FC<FormContainerProps> = ({ shown }) => {
  const { buttonDisabled, onSubmit } = useLogin();

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
