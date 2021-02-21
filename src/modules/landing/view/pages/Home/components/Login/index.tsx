import React from 'react';

// Components
import { Formik } from 'formik';
import { Button, Input } from 'shared/view/components';
import {
  Form,
  FormTitle,
  InputGroup,
} from 'modules/landing/view/pages/Home/components';

// Constants
import { initialValues } from './constants';

// Hooks
import { useLogin } from './hooks';

// Validation
import LoginSchema from 'modules/landing/validation/Login';

interface FormContainerProps {
  shown: boolean;
}

const Login: React.FC<FormContainerProps> = ({ shown }) => {
  const { buttonDisabled, onSubmit } = useLogin();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form shown={shown}>
          <FormTitle>Entre</FormTitle>

          <div>
            <Input type="email" name="email" placeholder="E-mail" />

            <Input type="password" name="password" placeholder="Senha" />

            <InputGroup>
              <Button type="submit" disabled={buttonDisabled}>
                Entrar
              </Button>
            </InputGroup>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
