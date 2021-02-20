import React from 'react';

// Components
import { Formik } from 'formik';
import { Input } from 'shared/view/components';
import { Form } from 'modules/landing/view/pages/Home/components';

// Constants
import { initialValues } from './constants';

// Hooks
import { useSignup } from './hooks';

// Schemas
import { SignupSchema } from './schemas';

// Styles
import { Button } from 'styles';

export interface FormContainerProps {
  shown: boolean;
}

const Signup: React.FC<FormContainerProps> = ({ shown }) => {
  const { buttonDisabled, onSubmit } = useSignup();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      <Form shown={shown}>
        <h2>Cadastre-se</h2>

        <div className="form-group">
          <Input type="text" name="firstname" placeholder="Nome" />

          <Input type="text" name="lastname" placeholder="Sobrenome" />

          <Input type="email" name="email" placeholder="E-mail" />

          <Input type="password" name="password" placeholder="Senha" />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
          />

          <div className="input-group">
            <Button type="submit" disabled={buttonDisabled}>
              Cadastrar
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Signup;
