import React, { useState } from 'react';

// Contexts
import { useAuth } from '../../contexts/Authorization';

// Formik
import { Formik, Field } from 'formik';

// Yup
import * as Yup from 'yup';

// Services
import api from '../../services/api';

// Styles
import Button from '../../styles/Button';
import { ErrorField } from '../../styles/Form';
import { HomePage, FormToggle, Form } from './styles';
import { toast } from 'react-toastify';
import handleErrors from '../../utils/handleErrors';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Digite seu email'),
  password: Yup.string().required('Digite sua senha'),
});

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required('Digite seu nome'),
  lastname: Yup.string(),
  email: Yup.string().email('E-mail inválido').required('Digite um e-mail'),
  password: Yup.string().required('Digite uma senha'),
  confirmPassword: Yup.string().required('Repita sua senha'),
});

const Home: React.FC = () => {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false);
  const [formToggle, setFormToggle] = useState(true);
  // Auth
  const { signIn } = useAuth();

  return (
    <HomePage>
      <div className="title">
        <h1>GAMETASK</h1>
      </div>

      <div className="container">
        <FormToggle.Container>
          <FormToggle.Button
            active={formToggle}
            onClick={() => setFormToggle(true)}
          >
            Entre
          </FormToggle.Button>

          <FormToggle.Button
            active={!formToggle}
            onClick={() => setFormToggle(false)}
          >
            Cadastre-se
          </FormToggle.Button>
        </FormToggle.Container>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async values => {
            setLoginButtonDisabled(true);

            // Login
            try {
              const response = await api.post('/login', values);

              return signIn(response.data);
            } catch (error) {
              handleErrors(error);
            }

            return setLoginButtonDisabled(false);
          }}
        >
          {({ errors, touched }) => (
            <Form shown={formToggle}>
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
                  <Button type="submit" disabled={loginButtonDisabled}>
                    Entrar
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            if (values.password !== values.confirmPassword) {
              actions.setErrors({
                confirmPassword: 'As senhas não são iguais',
              });
              return;
            }
            setSignupButtonDisabled(true);

            // Post user in the API
            try {
              await api.post('/user/signup', values);

              toast.success('Cadastro efetuado com sucesso!');
            } catch (error) {
              handleErrors(error);
            }

            return setSignupButtonDisabled(false);
          }}
        >
          {({ errors, touched }) => (
            <Form shown={!formToggle}>
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
      </div>
    </HomePage>
  );
};

export default Home;
