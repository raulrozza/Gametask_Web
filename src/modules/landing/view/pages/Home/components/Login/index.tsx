import React from 'react';

import { Formik } from 'formik';

import useLoginController from 'modules/landing/infra/controllers/useLoginController';
import {
  Form,
  FormTitle,
  InputGroup,
} from 'modules/landing/view/pages/Home/components';
import LoginSchema from 'modules/landing/view/validation/Login';
import { Button, Input } from 'shared/view/components';

interface FormContainerProps {
  shown: boolean;
}

const initialValues = {
  email: '',
  password: '',
};

const Login: React.FC<FormContainerProps> = ({ shown }) => {
  const { loading, onSubmit } = useLoginController();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form $shown={shown}>
          <FormTitle>Entre</FormTitle>

          <div>
            <Input type="email" name="email" placeholder="E-mail" />

            <Input type="password" name="password" placeholder="Senha" />

            <InputGroup>
              <Button type="submit" loading={loading}>
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
