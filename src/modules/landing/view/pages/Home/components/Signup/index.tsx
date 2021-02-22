import React from 'react';

import { Formik } from 'formik';
import { Button, Input } from 'shared/view/components';
import {
  Form,
  FormTitle,
  InputGroup,
} from 'modules/landing/view/pages/Home/components';

import useSignupController from 'modules/landing/infra/controllers/useSignupController';

import SignupSchema, {
  passwordsMatchValidation,
} from 'modules/landing/validation/Signup';

interface SignupProps {
  shown: boolean;
}

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup: React.FC<SignupProps> = ({ shown }) => {
  const { loading, onSubmit } = useSignupController();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      validate={passwordsMatchValidation}
      onSubmit={onSubmit}
    >
      <Form $shown={shown}>
        <FormTitle>Cadastre-se</FormTitle>

        <div>
          <Input type="text" name="firstname" placeholder="Nome" />

          <Input type="text" name="lastname" placeholder="Sobrenome" />

          <Input type="email" name="email" placeholder="E-mail" />

          <Input type="password" name="password" placeholder="Senha" />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
          />

          <InputGroup>
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </InputGroup>
        </div>
      </Form>
    </Formik>
  );
};

export default Signup;
