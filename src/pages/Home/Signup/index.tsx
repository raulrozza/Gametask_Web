import React, { useState, useCallback } from 'react';

// Components
import { Formik, Field } from 'formik';

// Hooks
import { useApiPost } from '../../../hooks/api/useApiPost';

// Schemas
import { SignupSchema } from './schemas';

// Styles
import Button from '../../../styles/Button';
import { ErrorField } from '../../../styles/Form';
import { Form } from '../styles';

// Types
import { FormContainerProps } from '../types';

// Utils
import displaySuccessMessage from '../../../utils/messages/displaySuccessMessage';
import { passwordsDontMatch } from './utils';

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

  // Hooks
  const apiPost = useApiPost();

  const onSubmit = useCallback(
    async (values, actions) => {
      const passwordsError = passwordsDontMatch(values);
      if (passwordsError) return actions.setErrors(passwordsError);

      setSignupButtonDisabled(true);

      const signupSuccessful = await apiPost('/user/signup', values);

      if (signupSuccessful)
        displaySuccessMessage('Cadastro efetuado com sucesso!');

      return setSignupButtonDisabled(false);
    },
    [apiPost],
  );

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
