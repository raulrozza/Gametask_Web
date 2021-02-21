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
import { useSignup } from './hooks';

// Validation
import SignupSchema, {
  passwordsMatchValidation,
} from 'modules/landing/validation/Signup';

interface SignupProps {
  shown: boolean;
}

const Signup: React.FC<SignupProps> = ({ shown }) => {
  const { buttonDisabled, onSubmit } = useSignup();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      validate={passwordsMatchValidation}
      onSubmit={onSubmit}
    >
      <Form shown={shown}>
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
            <Button type="submit" disabled={buttonDisabled}>
              Cadastrar
            </Button>
          </InputGroup>
        </div>
      </Form>
    </Formik>
  );
};

export default Signup;
