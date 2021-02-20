import React from 'react';

// Components
import { Formik } from 'formik';
import { Input } from 'shared/view/components';
import { Form } from 'modules/landing/view/pages/Home/components';

// Constants
import { initialValues } from './constants';

// Hooks
import { useLogin } from './hooks';

// Schemas
import { LoginSchema } from './schemas';

// Styles
import { Button } from 'styles';

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
          <h2>Entre</h2>

          <div className="form-group">
            <Input type="email" name="email" placeholder="E-mail" />

            <Input type="password" name="password" placeholder="Senha" />

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
