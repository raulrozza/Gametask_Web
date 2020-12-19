import React from 'react';

// Components
import { Formik, Field } from 'formik';

// Constants
import { initialValues } from './constants';

// Hooks
import { useSignup } from './hooks';

// Schemas
import { SignupSchema } from './schemas';

// Styles
import { Button, ErrorField } from 'styles';
import { Form } from '../../styles';

// Types
import { FormContainerProps } from '../../types';

const Signup: React.FC<FormContainerProps> = ({ shown }) => {
  const { buttonDisabled, onSubmit } = useSignup();

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
              <Button type="submit" disabled={buttonDisabled}>
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
